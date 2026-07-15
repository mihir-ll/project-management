import {
  SolidIcon,
  type SolidKanbanCardWidgetProps,
  useRouter,
} from "@solidxai/core-ui";
import { useEffect, useState } from "react";

import "./ProjectKanbanCardWidget.css";

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

    for (const key of ["displayName", "name", "labelTasks", "title", "value"]) {
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

const formatDeadline = (value: unknown) => {
  if (!value) return "No target date";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return "No target date";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

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

const buildTaskBoardUrl = () =>
  "/admin/core/project-management/project-task/kanban";

const PROJECT_TASK_COUNTS_READY_EVENT = "project-task-counts-ready";

const getInitials = (value: string, fallback = "P") => {
  const normalized = value.trim();
  if (!normalized) return fallback;

  return normalized
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

export default function ProjectKanbanCardWidget({
  rowData,
}: SolidKanbanCardWidgetProps) {
  const router = useRouter();
  const legacyProjectId = rowData?.legacyId;
  const entityProjectId = rowData?.id;
  const projectId = Number(legacyProjectId ?? entityProjectId ?? 0);
  const projectName = getDisplayText(rowData?.name, "Untitled Project");
  const [taskStats, setTaskStats] = useState({ total: 0, open: 0 });

  useEffect(() => {
    const syncTaskStats = () => {
      const taskBoardState = readStoredFilterState(buildTaskBoardUrl());
      setTaskStats({
        total: Number(
          taskBoardState?.projectTaskCounts?.[String(legacyProjectId)] ??
            taskBoardState?.projectTaskCounts?.[String(entityProjectId)] ??
            taskBoardState?.projectTaskCounts?.[String(projectId)] ??
            0,
        ),
        open: Number(
          taskBoardState?.projectOpenTaskCounts?.[String(legacyProjectId)] ??
            taskBoardState?.projectOpenTaskCounts?.[String(entityProjectId)] ??
            taskBoardState?.projectOpenTaskCounts?.[String(projectId)] ??
            0,
        ),
      });
    };

    syncTaskStats();
    window.addEventListener(PROJECT_TASK_COUNTS_READY_EVENT, syncTaskStats);

    return () => {
      window.removeEventListener(
        PROJECT_TASK_COUNTS_READY_EVENT,
        syncTaskStats,
      );
    };
  }, [entityProjectId, legacyProjectId, projectId]);

  const taskCount = taskStats.total;
  const progressCount = taskStats.open;
  const taskLabel = taskCount === 1 ? "Task" : "Tasks";
  const ownerLabel = getDisplayText(rowData?.userId, "Unassigned");
  const deadline = formatDeadline(rowData?.date);
  const ownerInitials = getInitials(ownerLabel, "P");
  const isTimesheetOnly = Boolean(rowData?.allowTimesheets) && taskCount === 0;
  const openTaskSummary =
    taskCount > 0
      ? `${progressCount} active`
      : isTimesheetOnly
        ? "Timesheet only"
        : "Open board";
  const statusLabel = isTimesheetOnly ? "Timesheet only" : "Open board";

  const openProjectTasks = (event?: {
    preventDefault?: () => void;
    stopPropagation?: () => void;
  }) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!projectId) return;

    const taskBoardUrl = buildTaskBoardUrl();
    const queryString = new URLSearchParams({
      projectId: String(entityProjectId ?? projectId ?? ""),
      projectLegacyId: String(legacyProjectId ?? ""),
    }).toString();

    router.push(`${taskBoardUrl}?${queryString}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="project-kanban-card"
      onClick={(event) => openProjectTasks(event)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          openProjectTasks(event);
        }
      }}
      title={`Open ${projectName} tasks`}
    >
      <div className="project-kanban-card__header">
        <div className="project-kanban-card__title-row">
          <span className="project-kanban-card__favorite">
            <SolidIcon name="si-star" aria-hidden />
          </span>

          <div className="project-kanban-card__title">{projectName}</div>
        </div>

        <div className="project-kanban-card__header-spacer" />

        <span className="project-kanban-card__menu">
          <SolidIcon name="si-ellipsis-v" aria-hidden />
        </span>
      </div>
      <div className="project-kanban-card__spacer" />

      <div className="project-kanban-card__body">
        <div className="project-kanban-card__summary flex justify-between">
          <strong>
            {taskCount} {taskLabel}
          </strong>
          <div className="project-kanban-card__footer-right">
            <span className="project-kanban-card__avatar" title={ownerLabel}>
              {ownerInitials}
            </span>
            <span
              className={
                isTimesheetOnly
                  ? "project-kanban-card__status-dot project-kanban-card__status-dot--muted"
                  : "project-kanban-card__status-dot project-kanban-card__status-dot--active"
              }
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
