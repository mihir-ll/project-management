import {
  SolidButton,
  SolidChatter,
  SolidFormView,
  SolidIcon,
  SolidLoadingState,
  SolidPanel,
  createSolidEntityApi,
  solidGet,
  useLazyCheckIfPermissionExistsQuery,
  usePathname,
  useSearchParams,
} from "@solidxai/core-ui";
import qs from "qs";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import "./ProjectTaskFormPage.css";

const TASK_FORM_LAYOUT = {
  type: "form",
  attrs: {
    name: "project-task-odoo-form",
    label: "Project Task",
    className: "grid",
  },
  children: [
    {
      type: "sheet",
      attrs: { name: "sheet-main" },
      children: [
        {
          type: "notebook",
          attrs: { name: "task-notebook" },
          children: [
            {
              type: "page",
              attrs: { name: "description-tab", label: "Description" },
              children: [
                {
                  type: "row",
                  attrs: { name: "description-row" },
                  children: [
                    {
                      type: "column",
                      attrs: {
                        name: "description-column",
                        className: "col-12",
                      },
                      children: [
                        { type: "field", attrs: { name: "description" } },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "page",
              attrs: { name: "planning-tab", label: "Planning" },
              children: [
                {
                  type: "row",
                  attrs: { name: "planning-row" },
                  children: [
                    {
                      type: "column",
                      attrs: {
                        name: "planning-left",
                        className: "col-12 md:col-6",
                      },
                      children: [
                        { type: "field", attrs: { name: "projectId" } },
                        { type: "field", attrs: { name: "milestoneId" } },
                        { type: "field", attrs: { name: "dateDeadline" } },
                        { type: "field", attrs: { name: "priority" } },
                      ],
                    },
                    {
                      type: "column",
                      attrs: {
                        name: "planning-right",
                        className: "col-12 md:col-6",
                      },
                      children: [
                        { type: "field", attrs: { name: "state" } },
                        { type: "field", attrs: { name: "xComplexity" } },
                        { type: "field", attrs: { name: "progress" } },
                        { type: "field", attrs: { name: "active" } },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "page",
              attrs: { name: "tracking-tab", label: "Tracking" },
              children: [
                {
                  type: "row",
                  attrs: { name: "tracking-row" },
                  children: [
                    {
                      type: "column",
                      attrs: {
                        name: "tracking-left",
                        className: "col-12 md:col-6",
                      },
                      children: [
                        { type: "field", attrs: { name: "allocatedHours" } },
                        { type: "field", attrs: { name: "effectiveHours" } },
                        { type: "field", attrs: { name: "remainingHours" } },
                        { type: "field", attrs: { name: "totalHoursSpent" } },
                      ],
                    },
                    {
                      type: "column",
                      attrs: {
                        name: "tracking-right",
                        className: "col-12 md:col-6",
                      },
                      children: [
                        { type: "field", attrs: { name: "workingDaysOpen" } },
                        { type: "field", attrs: { name: "workingDaysClose" } },
                        { type: "field", attrs: { name: "workingHoursOpen" } },
                        { type: "field", attrs: { name: "workingHoursClose" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} as const;

const resolveDisplayText = (value: unknown, fallback = "--"): string => {
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
    for (const nested of Object.values(objectValue)) {
      const text = resolveDisplayText(nested, "");
      if (text) return text;
    }
  }
  return fallback;
};

const formatHours = (value: unknown) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "0h";
  if (Number.isInteger(numericValue)) return `${numericValue}h`;
  return `${numericValue.toFixed(1)}h`;
};

const formatPercent = (value: unknown) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "0%";
  return `${Math.round(numericValue)}%`;
};

const formatDate = (value: unknown) => {
  if (!value) return "--";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const STATE_LABELS: Record<string, string> = {
  "01_in_progress": "In Progress",
  "02_changes_requested": "Changes Requested",
  "03_approved": "Approved",
  "1_done": "Done",
  "1_canceled": "Canceled",
};

const getStateLabel = (value: unknown) => {
  const normalizedValue = String(value ?? "").trim();
  return (
    STATE_LABELS[normalizedValue] ||
    normalizedValue
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()) ||
    "Open"
  );
};

type WorkflowStep = {
  label: string;
  value: string | number;
};

const permissionExpression = (modelName: string, permissionName: string) =>
  `${modelName
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^(.)/, (char) =>
      char.toUpperCase(),
    )}Controller.${permissionName}`;

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

export function ProjectTaskFormPage() {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = params.id || "";
  const modelName = "projectTask";
  const moduleName = "project-management";

  const [refreshKey, setRefreshKey] = useState(0);
  const [solidWorkflowFieldValue, setSolidWorkflowFieldValue] = useState<
    string | number
  >("");
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [isUpdatingStage, setIsUpdatingStage] = useState(false);
  const [actionsAllowed, setActionsAllowed] = useState<string[]>([]);
  const [refreshChatterMessage, setRefreshChatterMessage] = useState(false);

  const entityApi = useMemo(() => createSolidEntityApi(modelName), []);
  const { useGetSolidEntityByIdQuery, usePatchUpdateSolidEntityMutation } =
    entityApi;
  const [patchUpdateSolidEntity] = usePatchUpdateSolidEntityMutation();
  const [triggerCheckIfPermissionExists] =
    useLazyCheckIfPermissionExistsQuery();

  const entityQuery = useGetSolidEntityByIdQuery(
    {
      id,
      qs: qs.stringify(
        {
          populate: [
            "projectId",
            "milestoneId",
            "stageId",
            "tags",
            "projectTaskUserRels",
          ],
        },
        { encodeValuesOnly: true },
      ),
    },
    { skip: !id || id === "new" },
  );

  const taskRecord =
    entityQuery.data?.data ??
    entityQuery.data?.record ??
    entityQuery.data ??
    null;

  useEffect(() => {
    const currentUrl = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    try {
      sessionStorage.setItem("fromView", "form");
      sessionStorage.setItem("fromViewUrl", currentUrl);
    } catch {
      // Ignore storage failures.
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const permissionNames = [
        permissionExpression(modelName, "findOne"),
        permissionExpression(modelName, "update"),
        permissionExpression("chatterMessage", "findMany"),
      ];

      try {
        const queryString = qs.stringify(
          { permissionNames },
          { encodeValuesOnly: true },
        );
        const response = await triggerCheckIfPermissionExists(queryString);
        setActionsAllowed(response.data?.data || []);
      } catch {
        setActionsAllowed([]);
      }
    };

    void fetchPermissions();
  }, [modelName, triggerCheckIfPermissionExists]);

  useEffect(() => {
    const loadStages = async () => {
      const toStep = (record: any) => {
        const value = record?.legacyId ?? record?.id;
        const label =
          resolveDisplayText(record?.name, "") ||
          resolveDisplayText(record?.displayName, "") ||
          String(record?.legacyId ?? record?.id ?? "");

        if (value === null || value === undefined || !label) return null;
        return { value, label };
      };

      const currentStageStep = toStep(taskRecord?.stageId);
      const candidateProjectIds = [
        taskRecord?.projectId?.id,
        taskRecord?.projectId?.legacyId,
      ].filter((value, index, array) => {
        if (value === null || value === undefined || value === "") return false;
        return array.indexOf(value) === index;
      });

      try {
        const seenLabels = new Set<string>();
        let scopedTaskTypes: any[] = [];

        for (const candidateProjectId of candidateProjectIds) {
          try {
            const projectResponse = await solidGet(
              `/project/${candidateProjectId}`,
              {
                params: {
                  populate: ["taskTypes"],
                },
              },
            );

            const projectRecord =
              projectResponse?.data?.data?.record ||
              projectResponse?.data?.data;

            if (
              Array.isArray(projectRecord?.taskTypes) &&
              projectRecord.taskTypes.length > 0
            ) {
              scopedTaskTypes = [...projectRecord.taskTypes].sort(
                (left, right) => {
                  const leftSequence = Number(left?.sequence ?? 0);
                  const rightSequence = Number(right?.sequence ?? 0);
                  return leftSequence - rightSequence;
                },
              );
              break;
            }
          } catch {
            // Try the next project identifier.
          }
        }

        const steps = scopedTaskTypes
          .map((record: any) => toStep(record))
          .filter(
            (
              step,
            ): step is {
              value: string | number;
              label: string;
            } => Boolean(step),
          )
          .filter((step: any) => step.value && step.label)
          .filter((step: any) => {
            const normalizedLabel = step.label.trim().toLowerCase();
            if (!normalizedLabel) return false;

            if (seenLabels.has(normalizedLabel)) {
              return false;
            }

            seenLabels.add(normalizedLabel);
            return true;
          });

        if (
          currentStageStep &&
          !steps.some((step: any) => step.value === currentStageStep.value)
        ) {
          steps.push(currentStageStep);
        }

        setWorkflowSteps(steps);
      } catch {
        setWorkflowSteps(currentStageStep ? [currentStageStep] : []);
      }
    };

    void loadStages();
  }, [taskRecord?.projectId, taskRecord?.stageId]);

  useEffect(() => {
    const currentStageValue =
      taskRecord?.stageId?.legacyId ?? taskRecord?.stageId?.id ?? "";
    setSolidWorkflowFieldValue(currentStageValue);
  }, [taskRecord?.stageId?.legacyId, taskRecord?.stageId?.id]);

  if (entityQuery.isLoading && !taskRecord) {
    return (
      <div className="project-task-form-page project-task-form-page--loading">
        <SolidLoadingState />
      </div>
    );
  }

  const projectName = resolveDisplayText(taskRecord?.projectId?.name);
  const taskName = resolveDisplayText(taskRecord?.name, "Untitled Task");
  const milestoneName = resolveDisplayText(taskRecord?.milestoneId?.name, "--");
  const stageName = resolveDisplayText(taskRecord?.stageId?.name, "--");
  const activeStageLabel =
    workflowSteps.find((step) => step.value === solidWorkflowFieldValue)
      ?.label || stageName;
  const deadlineText = formatDate(taskRecord?.dateDeadline);
  const complexityText = resolveDisplayText(taskRecord?.xComplexity, "--");
  const assignedUsers = Array.isArray(taskRecord?.projectTaskUserRels)
    ? taskRecord.projectTaskUserRels
        .map((relation: any) =>
          resolveDisplayText(
            relation?.userId?.name ??
              relation?.partnerId?.name ??
              relation?.employeeId?.name ??
              relation?.name,
            "",
          ),
        )
        .filter(Boolean)
    : [];
  const tags = Array.isArray(taskRecord?.tags)
    ? taskRecord.tags
        .map((tag: any) => resolveDisplayText(tag?.name, ""))
        .filter(Boolean)
    : [];

  const handleStageChange = async (nextStageId: string | number) => {
    if (!id || id === "new" || isUpdatingStage) return;
    if (nextStageId === solidWorkflowFieldValue) return;

    const previousStageId = solidWorkflowFieldValue;
    const nextStep = workflowSteps.find((step) => step.value === nextStageId);
    const nextState = resolveStateFromStageLabel(
      nextStep?.label || "",
      taskRecord?.state,
    );
    setSolidWorkflowFieldValue(nextStageId);
    setIsUpdatingStage(true);

    try {
      await patchUpdateSolidEntity({
        id: Number(id),
        data: {
          stageId: nextStageId,
          state: nextState,
        },
      }).unwrap();

      await entityQuery.refetch();
      setRefreshChatterMessage(true);
      setRefreshKey((current) => current + 1);
    } catch {
      setSolidWorkflowFieldValue(previousStageId);
    } finally {
      setIsUpdatingStage(false);
    }
  };

  return (
    <div className="project-task-form-page p-2">
      <section className="project-task-form-page__hero">
        <div className="project-task-form-page__hero-top">
          <div className="project-task-form-page__crumb">
            <span className="project-task-form-page__crumb-project">
              {projectName}
            </span>
            <span className="project-task-form-page__crumb-separator">/</span>
            <span className="project-task-form-page__crumb-task">
              {taskName}
            </span>
          </div>

          <div className="project-task-form-page__hero-actions">
            <span className="project-task-form-page__state-pill">
              {activeStageLabel}
            </span>
            {entityQuery.isFetching || isUpdatingStage ? (
              <span className="project-task-form-page__syncing">
                Refreshing…
              </span>
            ) : null}
          </div>
        </div>

        {workflowSteps.length > 0 ? (
          <div className="project-task-form-page__stepper">
            <div className="project-task-form-page__stepper-track">
              {workflowSteps.map((step, index) => {
                const isActive = step.value === solidWorkflowFieldValue;
                const isCompleted =
                  workflowSteps.findIndex(
                    (workflowStep) =>
                      workflowStep.value === solidWorkflowFieldValue,
                  ) > index;

                return (
                  <button
                    key={`${step.value}`}
                    type="button"
                    className={[
                      "project-task-form-page__step",
                      isActive ? "project-task-form-page__step--active" : "",
                      isCompleted
                        ? "project-task-form-page__step--completed"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      void handleStageChange(step.value);
                    }}
                    disabled={isUpdatingStage}
                  >
                    <span className="project-task-form-page__step-label">
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="project-task-form-page__record-card">
          <div className="project-task-form-page__record-header">
            <div className="project-task-form-page__record-title-wrap">
              <span className="project-task-form-page__record-star">☆</span>
              <h1 className="project-task-form-page__record-title">
                {taskName}
              </h1>
            </div>
            <span className="project-task-form-page__record-stage-pill">
              {activeStageLabel}
            </span>
          </div>

          <div className="project-task-form-page__record-grid">
            <div className="project-task-form-page__record-column">
              <div className="project-task-form-page__field-row">
                <div className="project-task-form-page__field-label">
                  Project
                </div>
                <div className="project-task-form-page__field-value">
                  {projectName}
                </div>
              </div>
              <div className="project-task-form-page__field-row">
                <div className="project-task-form-page__field-label">
                  Milestone
                </div>
                <div className="project-task-form-page__field-value">
                  {milestoneName}
                </div>
              </div>
              <div className="project-task-form-page__field-row">
                <div className="project-task-form-page__field-label">
                  Assignees
                </div>
                <div className="project-task-form-page__field-value">
                  {assignedUsers.length > 0 ? assignedUsers.join(", ") : "--"}
                </div>
              </div>
              <div className="project-task-form-page__field-row">
                <div className="project-task-form-page__field-label">Tags</div>
                <div className="project-task-form-page__field-value">
                  {tags.length > 0 ? tags.join(", ") : "--"}
                </div>
              </div>
            </div>

            <div className="project-task-form-page__record-column">
              <div className="project-task-form-page__field-row">
                <div className="project-task-form-page__field-label">
                  Customer
                </div>
                <div className="project-task-form-page__field-value">--</div>
              </div>
              <div className="project-task-form-page__field-row">
                <div className="project-task-form-page__field-label">
                  Allocated Time
                </div>
                <div className="project-task-form-page__field-value">
                  {formatHours(taskRecord?.allocatedHours)} (
                  {formatPercent(taskRecord?.progress)})
                </div>
              </div>
              <div className="project-task-form-page__field-row">
                <div className="project-task-form-page__field-label">
                  Deadline
                </div>
                <div className="project-task-form-page__field-value">
                  {deadlineText}
                </div>
              </div>
              <div className="project-task-form-page__field-row">
                <div className="project-task-form-page__field-label">
                  Complexity
                </div>
                <div className="project-task-form-page__field-value">
                  {complexityText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="project-task-form-page__content">
        <div className="project-task-form-page__main">
          <SolidPanel
            className="project-task-form-page__panel project-task-form-page__panel--form"
            header={
              <div className="project-task-form-page__panel-header">
                <div>
                  <h2 className="project-task-form-page__panel-title">
                    {taskName}
                  </h2>
                </div>

                <SolidButton
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    void entityQuery.refetch();
                    setRefreshChatterMessage(true);
                  }}
                  disabled={entityQuery.isFetching}
                >
                  Refresh
                </SolidButton>
              </div>
            }
          >
            <SolidFormView
              key={`${id}-${refreshKey}`}
              moduleName={moduleName}
              modelName={modelName}
              id={id}
              embeded={true}
              customLayout={TASK_FORM_LAYOUT}
            />
          </SolidPanel>
        </div>

        <aside className="project-task-form-page__sidebar">
          <SolidPanel
            className="project-task-form-page__panel project-task-form-page__panel--chatter"
            header="Audit Trail"
          >
            <div className="project-task-form-page__chatter">
              <SolidChatter
                modelSingularName="project-task"
                id={id}
                refreshChatterMessage={refreshChatterMessage}
                setRefreshChatterMessage={setRefreshChatterMessage}
                actionsAllowed={actionsAllowed}
                title={taskName}
                modelUserKey={taskRecord?.projectTaskUserKey}
              />
            </div>
          </SolidPanel>
        </aside>
      </section>
    </div>
  );
}
