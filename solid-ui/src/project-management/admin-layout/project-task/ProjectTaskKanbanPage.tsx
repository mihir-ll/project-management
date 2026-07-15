import {
  SolidIcon,
  SolidKanbanView,
  SolidLoadingState,
  SolidDropdownMenu,
  SolidDropdownMenuContent,
  SolidDropdownMenuItem,
  SolidDropdownMenuTrigger,
  createSolidEntityApi,
  solidGet,
  usePathname,
  useRouter,
  useSearchParams,
} from "@solidxai/core-ui";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import { camelCase } from "lodash";
import qs from "qs";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectTaskKanbanCardWidget from "./extension-components/ProjectTaskKanbanCardWidget";
import "./ProjectTaskKanbanPage.css";

const PROJECT_TASK_GROUP_LIMIT = 250;
const PROJECT_TASK_RECORDS_PER_STAGE = 12;
const FOLDED_LANES_STORAGE_KEY = "project-task-folded-lanes";

type TaskStageColumn = {
  key: string;
  label: string;
  count: number;
  records: any[];
  sequence: number;
  stageEntityId: number | null;
  offset: number;
  isLoadingMore: boolean;
};

const resolveStateFromStageLabel = (
  stageLabel: string,
  fallbackState: unknown,
) => {
  const normalizedLabel = stageLabel.trim().toLowerCase();

  if (
    normalizedLabel.includes("cancel") ||
    normalizedLabel.includes("hold") ||
    normalizedLabel.includes("reject")
  ) {
    return "1_canceled";
  }

  if (
    normalizedLabel.includes("done") ||
    normalizedLabel.includes("complete") ||
    normalizedLabel.includes("closed")
  ) {
    return "1_done";
  }

  if (
    normalizedLabel.includes("approve") ||
    normalizedLabel.includes("published")
  ) {
    return "03_approved";
  }

  if (
    normalizedLabel.includes("review") ||
    normalizedLabel.includes("change") ||
    normalizedLabel.includes("qa") ||
    normalizedLabel.includes("test")
  ) {
    return "02_changes_requested";
  }

  return String(fallbackState ?? "01_in_progress") || "01_in_progress";
};

const resolveDisplayText = (value: unknown, fallback = ""): string => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value.trim() || fallback;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    const joined = value
      .map((item) => resolveDisplayText(item, ""))
      .filter(Boolean)
      .join(", ");
    return joined || fallback;
  }
  if (typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    if (typeof objectValue.en_US === "string" && objectValue.en_US.trim()) {
      return objectValue.en_US.trim();
    }
    for (const key of ["displayName", "name", "label", "title", "value"]) {
      const text = resolveDisplayText(objectValue[key], "");
      if (text) return text;
    }
    for (const nestedValue of Object.values(objectValue)) {
      const text = resolveDisplayText(nestedValue, "");
      if (text) return text;
    }
  }
  return fallback;
};

const resolveGroupKey = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    const key =
      objectValue.legacyId ??
      objectValue.id ??
      objectValue.value ??
      objectValue.key;

    if (key !== null && key !== undefined && key !== "") {
      return String(key);
    }
  }
  return "";
};

export function ProjectTaskKanbanPage() {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.toString();
  const moduleName = params.moduleName || "";
  const modelName = params.modelName ? camelCase(params.modelName) : "";
  const scopedEntityProjectId = searchParams.get("projectId") || "";
  const scopedLegacyProjectId = searchParams.get("projectLegacyId") || "";
  const scopedProjectId = scopedEntityProjectId || scopedLegacyProjectId;

  const [searchText, setSearchText] = useState("");
  const [columns, setColumns] = useState<TaskStageColumn[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(scopedProjectId));
  const [foldedLanes, setFoldedLanes] = useState<Record<string, boolean>>({});
  const entityApi = useMemo(() => createSolidEntityApi(modelName), [modelName]);
  const [patchUpdateSolidEntity] = entityApi.usePatchUpdateSolidEntityMutation();

  const resolveCandidateProjectIds = () =>
    [scopedEntityProjectId, scopedLegacyProjectId]
      .filter((value, index, array) => {
        if (!value) return false;
        return array.indexOf(value) === index;
      })
      .map((value) => Number(value));

  useEffect(() => {
    const currentUrl = search ? `${pathname}?${search}` : pathname;

    try {
      sessionStorage.setItem("fromView", "kanban");
      sessionStorage.setItem("fromViewUrl", currentUrl);
    } catch {
      // Ignore storage failures.
    }
  }, [pathname, search]);

  useEffect(() => {
    if (!scopedProjectId || typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(
        `${FOLDED_LANES_STORAGE_KEY}:${scopedProjectId}`,
      );
      setFoldedLanes(stored ? JSON.parse(stored) : {});
    } catch {
      setFoldedLanes({});
    }
  }, [scopedProjectId]);

  useEffect(() => {
    if (!scopedProjectId || typeof window === "undefined") return;

    try {
      window.localStorage.setItem(
        `${FOLDED_LANES_STORAGE_KEY}:${scopedProjectId}`,
        JSON.stringify(foldedLanes),
      );
    } catch {
      // Ignore storage failures.
    }
  }, [foldedLanes, scopedProjectId]);

  useEffect(() => {
    if (!scopedProjectId) {
      setColumns([]);
      setIsLoading(false);
      return;
    }

    const loadProjectTaskBoard = async () => {
      setIsLoading(true);

      try {
        const candidateProjectIds = resolveCandidateProjectIds();

        let projectRecord: any = null;

        for (const candidateProjectId of candidateProjectIds) {
          try {
            const response = await solidGet(`/project/${candidateProjectId}`, {
              params: {
                populate: ["taskTypes"],
              },
            });

            projectRecord =
              response?.data?.data?.record || response?.data?.data || null;

            if (projectRecord) {
              break;
            }
          } catch {
            // Try the next project identifier.
          }
        }

        const taskTypes = [...(projectRecord?.taskTypes || [])].sort(
          (left, right) =>
            Number(left?.sequence ?? 0) - Number(right?.sequence ?? 0),
        );

        const groupedTasksResponse = await solidGet("/project-task", {
          params: {
            offset: 0,
            limit: PROJECT_TASK_GROUP_LIMIT,
            groupBy: "stageId",
            populateGroup: true,
            filters:
              candidateProjectIds.length > 1
                ? {
                    $or: candidateProjectIds.map((candidateProjectId) => ({
                      projectId: {
                        $eq: candidateProjectId,
                      },
                    })),
                  }
                : {
                    projectId: {
                      $eq: candidateProjectIds[0],
                    },
                  },
            groupFilter: {
              limit: PROJECT_TASK_RECORDS_PER_STAGE,
              offset: 0,
              populate: ["projectId", "milestoneId", "stageId", "tags"],
            },
          },
        });

        const payload = groupedTasksResponse?.data?.data || {};
        const groupMeta = payload?.groupMeta || [];
        const groupRecords = payload?.groupRecords || [];

        const groupCountByKey = new Map<string, number>();
        for (const group of groupMeta) {
          const key = resolveGroupKey(group?.groupValue ?? group?.groupName);
          if (!key) continue;
          groupCountByKey.set(key, Number(group?.count ?? 0));
        }

        const groupRecordsByKey = new Map<string, any>();
        for (const group of groupRecords) {
          const key = resolveGroupKey(group?.groupValue ?? group?.groupName);
          if (!key) continue;
          groupRecordsByKey.set(key, group);
        }

        const nextColumns: TaskStageColumn[] = [];
        const renderedStageKeys = new Set<string>();

        for (const taskType of taskTypes) {
          const candidateKeys = [
            resolveGroupKey(taskType?.legacyId),
            resolveGroupKey(taskType?.id),
          ].filter(Boolean);

          const recordGroup = candidateKeys
            .map((key) => groupRecordsByKey.get(key))
            .find(Boolean);
          const count = candidateKeys.reduce((resolvedCount, key) => {
            if (resolvedCount > 0) return resolvedCount;
            return Number(groupCountByKey.get(key) ?? 0);
          }, 0);

          const columnKey = candidateKeys[0] || candidateKeys[1];
          if (!columnKey || renderedStageKeys.has(columnKey)) continue;

          renderedStageKeys.add(columnKey);
          nextColumns.push({
            key: columnKey,
            label:
              resolveDisplayText(taskType?.name) ||
              resolveDisplayText(taskType?.displayName) ||
              columnKey,
            count,
            records: recordGroup?.groupData?.records || [],
            sequence: Number(taskType?.sequence ?? 0),
            stageEntityId:
              Number(taskType?.id ?? recordGroup?.groupValue?.id ?? 0) || null,
            offset: (recordGroup?.groupData?.records || []).length,
            isLoadingMore: false,
          });
        }

        for (const group of groupRecords) {
          const relationValue = group?.groupData?.records?.[0]?.stageId;
          const key =
            resolveGroupKey(relationValue) ||
            resolveGroupKey(group?.groupValue ?? group?.groupName);
          if (!key || renderedStageKeys.has(key)) continue;

          renderedStageKeys.add(key);
          nextColumns.push({
            key,
            label:
              resolveDisplayText(relationValue?.name) ||
              resolveDisplayText(relationValue?.displayName) ||
              key,
            count: Number(group?.groupData?.meta?.totalRecords ?? 0),
            records: group?.groupData?.records || [],
            sequence: Number.MAX_SAFE_INTEGER,
            stageEntityId:
              Number(relationValue?.id ?? group?.groupValue?.id ?? 0) || null,
            offset: (group?.groupData?.records || []).length,
            isLoadingMore: false,
          });
        }

        setColumns(
          nextColumns.sort((left, right) => left.sequence - right.sequence),
        );
      } catch {
        setColumns([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProjectTaskBoard();
  }, [scopedEntityProjectId, scopedLegacyProjectId, scopedProjectId]);

  const filteredColumns = useMemo(() => {
    if (!searchText.trim()) return columns;

    const normalizedQuery = searchText.trim().toLowerCase();

    return columns
      .map((column) => ({
        ...column,
        records: column.records.filter((record) =>
          resolveDisplayText(record?.name, "")
            .toLowerCase()
            .includes(normalizedQuery),
        ),
      }))
      .filter(
        (column) =>
          column.label.toLowerCase().includes(normalizedQuery) ||
          column.records.length > 0,
      );
  }, [columns, searchText]);

  const handleToggleFold = (columnKey: string) => {
    setFoldedLanes((current) => ({
      ...current,
      [columnKey]: !current[columnKey],
    }));
  };

  const handleLoadMore = async (columnKey: string) => {
    const candidateProjectIds = resolveCandidateProjectIds();
    const column = columns.find((item) => item.key === columnKey);

    if (!column || column.isLoadingMore || column.records.length >= column.count) {
      return;
    }

    if (!column.stageEntityId) {
      return;
    }

    setColumns((current) =>
      current.map((item) =>
        item.key === columnKey ? { ...item, isLoadingMore: true } : item,
      ),
    );

    try {
      const stageFilterCandidates = Array.from(
        new Set(
          [column.stageEntityId, Number(column.key)]
            .filter((value) => Number.isFinite(value) && Number(value) > 0)
            .map((value) => Number(value)),
        ),
      );

      let newRecords: any[] = [];

      for (const stageFilterId of stageFilterCandidates) {
        const response = await solidGet("/project-task", {
          params: {
            offset: 0,
            limit: 1,
            groupBy: "stageId",
            populateGroup: true,
            filters:
              candidateProjectIds.length > 1
                ? {
                    $and: [
                      {
                        $or: candidateProjectIds.map((candidateProjectId) => ({
                          projectId: {
                            $eq: candidateProjectId,
                          },
                        })),
                      },
                      {
                        stageId: {
                          $eq: stageFilterId,
                        },
                      },
                    ],
                  }
                : {
                    $and: [
                      {
                        projectId: {
                          $eq: candidateProjectIds[0],
                        },
                      },
                      {
                        stageId: {
                          $eq: stageFilterId,
                        },
                      },
                    ],
                  },
            groupFilter: {
              limit: PROJECT_TASK_RECORDS_PER_STAGE,
              offset: column.offset,
              populate: ["projectId", "milestoneId", "stageId", "tags"],
            },
          },
        });

        const payload = response?.data?.data || {};
        const matchingGroup = (payload?.groupRecords || []).find((group: any) => {
          const key = resolveGroupKey(group?.groupValue ?? group?.groupName);
          return key === column.key || Number(group?.groupValue?.id ?? 0) === stageFilterId;
        });

        newRecords = matchingGroup?.groupData?.records || [];
        if (newRecords.length > 0) {
          break;
        }
      }

      setColumns((current) =>
        current.map((item) => {
          if (item.key !== columnKey) return item;

          const existingRecordIds = new Set(
            item.records.map((record) => String(record?.id ?? "")),
          );
          const appendedRecords = newRecords.filter(
            (record: any) => !existingRecordIds.has(String(record?.id ?? "")),
          );

          return {
            ...item,
            records: [...item.records, ...appendedRecords],
            offset: item.offset + newRecords.length,
            isLoadingMore: false,
          };
        }),
      );
    } catch {
      setColumns((current) =>
        current.map((item) =>
          item.key === columnKey ? { ...item, isLoadingMore: false } : item,
        ),
      );
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const previousColumns = columns;
    const sourceColumn = previousColumns.find(
      (column) => column.key === source.droppableId,
    );
    const destinationColumn = previousColumns.find(
      (column) => column.key === destination.droppableId,
    );

    if (!sourceColumn || !destinationColumn) return;

    const movedRecord = sourceColumn.records[source.index];
    if (!movedRecord) return;

    const updatedRecord = {
      ...movedRecord,
      stageId: destinationColumn.stageEntityId ?? destination.droppableId,
      state: resolveStateFromStageLabel(
        destinationColumn.label,
        movedRecord?.state,
      ),
    };

    const nextColumns = previousColumns.map((column) => {
      if (column.key === source.droppableId) {
        const nextRecords = [...column.records];
        nextRecords.splice(source.index, 1);
        return {
          ...column,
          count: Math.max(0, column.count - 1),
          records: nextRecords,
        };
      }

      if (column.key === destination.droppableId) {
        const nextRecords = [...column.records];
        nextRecords.splice(destination.index, 0, updatedRecord);
        return {
          ...column,
          count: column.count + 1,
          records: nextRecords,
        };
      }

      return column;
    });

    setColumns(nextColumns);

    try {
      await patchUpdateSolidEntity({
        id: Number(draggableId),
        data: {
          stageId: Number(destinationColumn.stageEntityId ?? destination.droppableId),
          state: updatedRecord.state,
        },
      }).unwrap();
    } catch {
      setColumns(previousColumns);
    }
  };

  if (!scopedProjectId) {
    return (
      <div className="project-task-kanban-page">
        <SolidKanbanView
          {...params}
          embeded={false}
          moduleName={moduleName}
          modelName={modelName}
        />
      </div>
    );
  }

  return (
    <div className="project-task-kanban-page project-task-kanban-page--custom solid-list-surface solid-kanban-surface flex flex-col flex-1 min-h-0">
      <div className="project-task-kanban-page__toolbar page-header solid-list-toolbar solid-kanban-toolbar">
        <div className="project-task-kanban-page__title">Project Task Kanban</div>

        <div className="project-task-kanban-page__toolbar-actions">
          <div className="project-task-kanban-page__search">
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search."
            />
            <SolidIcon name="si-search" aria-hidden />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="project-task-kanban-page__loading">
          <SolidLoadingState />
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="solid-kanban-board-wrapper">
            <div className="project-task-kanban-page__board solid-kanban-board-scroll-context">
            {filteredColumns.map((column) => {
              const isFolded = Boolean(foldedLanes[column.key]);

              return (
                <section
                  key={column.key}
                  className={
                    isFolded
                      ? "project-task-kanban-page__lane kanban-column kanban-column-folded project-task-kanban-page__lane--folded"
                      : "project-task-kanban-page__lane kanban-column"
                  }
                >
                  <div className="project-task-kanban-page__lane-header kaban-heading-area">
                    {isFolded ? (
                      <button
                        type="button"
                        className="project-task-kanban-page__lane-folded-trigger"
                        onClick={() => handleToggleFold(column.key)}
                        aria-expanded={false}
                        aria-label={`Expand ${column.label}`}
                      >
                        <div className="flex items-center">
                          <div className="kanban-arrow-icon-container">
                            <SolidIcon name="si-sort-up-fill" aria-hidden />
                            <SolidIcon name="si-sort-down-fill" aria-hidden />
                          </div>
                          <p className="kanban-group-heading">
                            {column.label}
                            <span className="kanban-count-badge">{column.count}</span>
                          </p>
                        </div>
                      </button>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <p className="kanban-group-heading">
                            {column.label}
                            <span className="kanban-count-badge">{column.count}</span>
                          </p>
                        </div>
                        <SolidDropdownMenu>
                          <SolidDropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="solid-header-cog-trigger kanban-column-cogwheel"
                              aria-label={`Open ${column.label} lane options`}
                            >
                              <SolidIcon name="si-cog" aria-hidden />
                            </button>
                          </SolidDropdownMenuTrigger>
                          <SolidDropdownMenuContent
                            className="solid-custom-overlay kanban-options-panel"
                            align="start"
                          >
                            <SolidDropdownMenuItem
                              className="solid-header-dropdown-item kanban-fold-action-button"
                              onSelect={() => handleToggleFold(column.key)}
                            >
                              <SolidIcon
                                name="si-angle-double-left"
                                className="solid-header-action-button-icon"
                                aria-hidden
                              />
                              <span className="solid-header-action-button-label">Fold</span>
                            </SolidDropdownMenuItem>
                          </SolidDropdownMenuContent>
                        </SolidDropdownMenu>
                      </>
                    )}
                  </div>

                  {!isFolded ? (
                    <Droppable
                      droppableId={column.key}
                      isDropDisabled={Boolean(searchText.trim())}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="project-task-kanban-page__lane-body"
                        >
                          {column.records.map((record, index) => (
                            <Draggable
                              key={record?.id}
                              draggableId={String(record?.id)}
                              index={index}
                              isDragDisabled={Boolean(searchText.trim())}
                            >
                              {(dragProvided) => (
                                <div
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.draggableProps}
                                  {...dragProvided.dragHandleProps}
                                >
                                  <div
                                    role="button"
                                    tabIndex={0}
                                    className="project-task-kanban-page__card-button"
                                    onClick={() => {
                                      router.push(
                                        `/admin/core/project-management/project-task/form/${record?.id}`,
                                      );
                                    }}
                                    onKeyDown={(event) => {
                                      if (
                                        event.key === "Enter" ||
                                        event.key === " "
                                      ) {
                                        event.preventDefault();
                                        router.push(
                                          `/admin/core/project-management/project-task/form/${record?.id}`,
                                        );
                                      }
                                    }}
                                  >
                                    <ProjectTaskKanbanCardWidget
                                      {...({
                                        rowData: record,
                                      } as any)}
                                    />
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          {column.records.length < column.count ? (
                            <button
                              type="button"
                              className="project-task-kanban-page__load-more"
                              onClick={() => {
                                void handleLoadMore(column.key);
                              }}
                              disabled={column.isLoadingMore}
                            >
                              {column.isLoadingMore
                                ? "Loading..."
                                : `Load more data... (${column.count - column.records.length} remaining)`}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </Droppable>
                  ) : null}
                </section>
              );
            })}
            </div>
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
