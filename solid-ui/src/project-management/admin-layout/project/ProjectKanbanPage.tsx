import {
  SolidKanbanView,
  solidGet,
  usePathname,
  useSearchParams,
  useGetSolidViewLayoutQuery,
} from "@solidxai/core-ui";
import { camelCase } from "lodash";
import qs from "qs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const PROJECT_TASK_BOARD_URL =
  "/admin/core/project-management/project-task/kanban";
const PROJECT_TASK_COUNTS_READY_EVENT = "project-task-counts-ready";
const PROJECT_TASK_GROUP_LIMIT = 500;

const readStoredFilterState = (url: string) => {
  if (typeof window === "undefined") return {};

  const encoded = window.localStorage.getItem(url);
  if (!encoded) return {};

  try {
    return JSON.parse(window.atob(encoded));
  } catch {
    return {};
  }
};

const writeStoredFilterState = (url: string, value: any) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(url, window.btoa(JSON.stringify(value)));
  } catch {
    // Ignore storage failures.
  }
};

const getDisplayText = (value: unknown, fallback = ""): string => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value.trim() || fallback;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    const joined = value
      .map((item) => getDisplayText(item))
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
      const text = getDisplayText(objectValue[key]);
      if (text) return text;
    }
    for (const nested of Object.values(objectValue)) {
      const text = getDisplayText(nested);
      if (text) return text;
    }
  }
  return fallback;
};

const setHeadingLabel = (heading: HTMLElement, label: string) => {
  const badge = heading.querySelector(".kanban-count-badge");
  if (!badge) {
    heading.textContent = label;
    return;
  }

  const firstChild = heading.firstChild;
  if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
    firstChild.nodeValue = label;
    return;
  }

  heading.insertBefore(document.createTextNode(label), badge);
};

const collectProjectTaskCounts = async (onlyOpen: boolean) => {
  const countsByProjectId: Record<string, number> = {};
  let offset = 0;
  let totalGroups = Infinity;

  while (offset < totalGroups) {
    const query = qs.stringify(
      {
        offset,
        limit: PROJECT_TASK_GROUP_LIMIT,
        groupBy: "projectId",
        populateGroup: true,
        ...(onlyOpen
          ? {
              filters: {
                state: {
                  $ne: "1_done",
                },
              },
            }
          : {}),
        groupFilter: {
          limit: 1,
          offset: 0,
          populate: ["projectId"],
        },
      },
      { encodeValuesOnly: true },
    );

    const response = await solidGet(`/project-task?${query}`);
    const payload = response?.data?.data;
    const groupRecords = payload?.groupRecords || [];
    const groupMeta = payload?.groupMeta || [];

    totalGroups = Number(payload?.meta?.totalRecords ?? groupMeta.length ?? 0);

    for (const groupRecord of groupRecords) {
      const count = Number(groupRecord?.groupData?.meta?.totalRecords ?? 0);
      const firstRecord = groupRecord?.groupData?.records?.[0];
      const projectValue = firstRecord?.projectId;

      for (const key of [
        projectValue?.id,
        projectValue?.legacyId,
        groupRecord?.groupValue,
      ]) {
        if (key === null || key === undefined || key === "") continue;
        countsByProjectId[String(key)] = count;
      }
    }

    if (!groupRecords.length) break;
    offset += groupRecords.length;
  }

  return countsByProjectId;
};

export function ProjectKanbanPage() {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const boardRef = useRef<HTMLDivElement | null>(null);
  const primedPathRef = useRef<string | null>(null);

  const search = searchParams.toString();
  const moduleName = params.moduleName || "";
  const modelName = params.modelName ? camelCase(params.modelName) : "";
  const [stageLabels, setStageLabels] = useState<Record<string, string>>({});

  const viewLayoutQuery = qs.stringify(
    {
      modelName,
      moduleName,
      viewType: "kanban",
      menuItemId: searchParams.get("menuItemId"),
      menuItemName: searchParams.get("menuItemName"),
      actionId: searchParams.get("actionId"),
      actionName: searchParams.get("actionName"),
    },
    { encodeValuesOnly: true },
  );

  useGetSolidViewLayoutQuery(viewLayoutQuery, {
    skip: !moduleName || !modelName,
  });

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
    if (primedPathRef.current === pathname) {
      return;
    }
    primedPathRef.current = pathname;

    const primeProjectTaskCounts = async () => {
      try {
        const [countsByProjectId, openCountsByProjectId] = await Promise.all([
          collectProjectTaskCounts(false),
          collectProjectTaskCounts(true),
        ]);

        const nextStoredState = readStoredFilterState(PROJECT_TASK_BOARD_URL);

        writeStoredFilterState(PROJECT_TASK_BOARD_URL, {
          ...nextStoredState,
          projectTaskCounts: countsByProjectId,
          projectOpenTaskCounts: openCountsByProjectId,
        });
        window.dispatchEvent(new Event(PROJECT_TASK_COUNTS_READY_EVENT));
      } catch {
        // Card widget falls back safely when counts are not primed.
      }
    };

    void primeProjectTaskCounts();
  }, [pathname]);

  useEffect(() => {
    const loadProjectStages = async () => {
      try {
        const response = await solidGet("/project-project-stage", {
          params: {
            offset: 0,
            limit: 100,
            sort: ["sequence:asc"],
          },
        });

        const nextLabels: Record<string, string> = {};
        for (const record of response?.data?.data?.records || []) {
          const label = getDisplayText(
            record?.name,
            String(record?.legacyId ?? record?.id ?? ""),
          );

          for (const stageId of [
            String(record?.legacyId ?? ""),
            String(record?.id ?? ""),
          ]) {
            if (!stageId) continue;
            nextLabels[stageId] = label;
          }
        }

        setStageLabels(nextLabels);
      } catch {
        // Leave default headings if stage metadata cannot be resolved.
      }
    };

    void loadProjectStages();
  }, []);

  useEffect(() => {
    const boardElement = boardRef.current;
    if (!boardElement) return;

    const patchColumns = () => {
      const columns = Array.from(
        boardElement.querySelectorAll<HTMLElement>(".kanban-column"),
      );

      for (const column of columns) {
        const droppable = column.querySelector<HTMLElement>(
          "[data-rfd-droppable-id]",
        );
        const heading = column.querySelector<HTMLElement>(
          ".kanban-group-heading",
        );
        if (!droppable || !heading) continue;

        const stageId = droppable.getAttribute("data-rfd-droppable-id") || "";
        const stageLabel = stageLabels[stageId];
        if (stageLabel) {
          setHeadingLabel(heading, stageLabel);
        }
      }
    };

    const runPatchSequence = () => {
      const animationFrameId = window.requestAnimationFrame(() => {
        patchColumns();
      });

      const timers = [0, 50, 150, 300, 600, 1000, 1500].map((delay) =>
        window.setTimeout(patchColumns, delay),
      );

      return () => {
        window.cancelAnimationFrame(animationFrameId);
        for (const timer of timers) {
          window.clearTimeout(timer);
        }
      };
    };

    const clearInitialSequence = runPatchSequence();

    const handleBoardInteraction = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const shouldRepatch =
        Boolean(
          target.closest(
            ".kanban-fold-action-button, .kanban-column-cogwheel, .kanban-arrow-icon-container, .kanban-group-heading",
          ),
        ) || target.getAttribute("data-rfd-droppable-id") !== null;

      if (!shouldRepatch) return;

      runPatchSequence();
    };

    boardElement.addEventListener("click", handleBoardInteraction, true);

    let observer: MutationObserver | null = null;
    if (typeof MutationObserver !== "undefined") {
      observer = new MutationObserver((mutations) => {
        const shouldRepatch = mutations.some((mutation) => {
          if (mutation.type === "childList") return true;
          if (mutation.type === "attributes") {
            const target = mutation.target as HTMLElement | null;
            if (!target) return false;
            return Boolean(
              target.closest(".kanban-column") ||
                target.classList.contains("kanban-group-heading"),
            );
          }
          return false;
        });

        if (shouldRepatch) {
          runPatchSequence();
        }
      });

      observer.observe(boardElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }

    return () => {
      clearInitialSequence();
      observer?.disconnect();
      boardElement.removeEventListener("click", handleBoardInteraction, true);
    };
  }, [stageLabels]);

  return (
    <div ref={boardRef}>
      <SolidKanbanView
        {...params}
        embeded={false}
        moduleName={moduleName}
        modelName={modelName}
      />
    </div>
  );
}
