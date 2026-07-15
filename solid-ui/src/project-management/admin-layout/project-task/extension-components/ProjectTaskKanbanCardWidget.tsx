import { SolidIcon, type SolidKanbanCardWidgetProps } from "@solidxai/core-ui";

import "./ProjectTaskKanbanCardWidget.css";

const PRIORITY_TONES: Record<string, Record<string, string>> = {
  normal: {
    accent: "#059669",
    accentSoft: "rgba(5,150,105,.12)",
    chipBg: "rgba(5,150,105,.10)",
    chipText: "#047857",
  },
  high: {
    accent: "#d97706",
    accentSoft: "rgba(217,119,6,.12)",
    chipBg: "rgba(217,119,6,.10)",
    chipText: "#b45309",
  },
  urgent: {
    accent: "#dc2626",
    accentSoft: "rgba(220,38,38,.12)",
    chipBg: "rgba(220,38,38,.10)",
    chipText: "#b91c1c",
  },
  default: {
    accent: "#64748b",
    accentSoft: "rgba(100,116,139,.12)",
    chipBg: "rgba(100,116,139,.10)",
    chipText: "#475569",
  },
};

const STATE_LABELS: Record<string, string> = {
  "01_in_progress": "In Progress",
  "02_changes_requested": "Changes Requested",
  "03_approved": "Approved",
  "1_done": "Done",
  "1_canceled": "Canceled",
};

const STATE_TONES: Record<string, string> = {
  "01_in_progress": "info",
  "02_changes_requested": "warning",
  "03_approved": "success",
  "1_done": "success",
  "1_canceled": "muted",
};

const extractLocalizedText = (value: any): string => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "";
  }

  if (typeof value.en_US === "string" && value.en_US.trim()) {
    return value.en_US.trim();
  }

  for (const candidate of Object.values(value)) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  return "";
};

const renderText = (value: any, fallback = "--"): string => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  ) {
    return String(value);
  }

  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  if (typeof value === "object") {
    const localized = extractLocalizedText(value);
    if (localized) return localized;

    for (const key of [
      "displayName",
      "name",
      "label",
      "title",
      "value",
      "fullName",
      "projectUserKey",
      "projectTaskStageUserKey",
      "milestoneUserKey",
    ]) {
      const nestedValue = value?.[key];
      const text: string = renderText(nestedValue, "");
      if (text) return text;
    }

    for (const nestedValue of Object.values(value)) {
      const text: string = renderText(nestedValue, "");
      if (text) return text;
    }

    return fallback;
  }

  return fallback;
};

const toTitleCase = (value: any, fallback = "--") => {
  const text = renderText(value, "");
  if (!text) return fallback;

  return text
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
};

const getTone = (priority: any) => {
  const normalizedPriority = String(priority ?? "").trim().toLowerCase();
  const priorityKey =
    normalizedPriority === "1" || normalizedPriority === "high"
      ? "high"
      : normalizedPriority === "2" || normalizedPriority === "3"
        ? "urgent"
        : "normal";

  return (
    PRIORITY_TONES[priorityKey] ||
    PRIORITY_TONES.default
  );
};

const getDisplayName = (value: any, fallback = "--") => {
  if (!value) return fallback;

  return renderText(
    value.name ||
      value.displayName ||
      value.fullName ||
      value.projectUserKey ||
      value.projectTaskStageUserKey ||
      value.milestoneUserKey ||
      value.id,
    fallback,
  );
};

const getInitials = (value: string, fallback = "T") => {
  const normalized = value.trim();
  if (!normalized || normalized === "--") return fallback;

  return normalized
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const formatHours = (value: any) => {
  const hours = Number(value);

  if (!Number.isFinite(hours)) return "--";

  return `${hours}h`;
};

const formatProgress = (value: any) => {
  const progress = Number(value);

  if (!Number.isFinite(progress)) return "--";

  return `${Math.round(progress)}%`;
};

const formatDate = (value: any) => {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getPriorityLabel = (priority: any) => {
  const normalizedPriority = String(priority ?? "").trim().toLowerCase();

  if (normalizedPriority === "1" || normalizedPriority === "high") {
    return "High Priority";
  }

  if (normalizedPriority === "2") {
    return "Very High";
  }

  if (normalizedPriority === "3" || normalizedPriority === "urgent") {
    return "Urgent";
  }

  return "Normal Priority";
};

const getStateLabel = (state: any) => {
  const normalizedState = String(state ?? "").trim();
  return STATE_LABELS[normalizedState] || toTitleCase(normalizedState, "Open");
};

const getStateTone = (state: any) => {
  const normalizedState = String(state ?? "").trim();
  return STATE_TONES[normalizedState] || "default";
};

export default function ProjectTaskKanbanCardWidget({
  rowData,
}: SolidKanbanCardWidgetProps) {
  const title = renderText(rowData?.name, "Untitled Task");

  const priority = getPriorityLabel(rowData?.priority);
  const stage = getDisplayName(rowData?.stageId, "--");
  const project = getDisplayName(rowData?.projectId, "--");
  const milestone = getDisplayName(rowData?.milestoneId, "--");
  const state = getStateLabel(rowData?.state);
  const stateTone = getStateTone(rowData?.state);
  const deadlineText = formatDate(rowData?.dateDeadline);
  const hasDeadline = deadlineText !== "--";
  const isOverdue =
    hasDeadline && new Date(rowData?.dateDeadline).getTime() < Date.now();
  const progress = formatProgress(rowData?.progress);
  const spent = formatHours(rowData?.effectiveHours);
  const remaining = formatHours(rowData?.remainingHours);
  const projectInitials = getInitials(project, "P");
  const milestoneLabel = milestone !== "--" ? milestone : null;
  const stateLabel = state !== "Open" ? state : null;
  const showStateChip =
    stateLabel && !["In Progress", "Assigned", "Backlog", "Open"].includes(stateLabel);

  const tone = getTone(rowData?.priority);

  const cardStyle = {
    ["--project-kanban-accent" as any]: tone.accent,
    ["--project-kanban-accent-soft" as any]: tone.accentSoft,
    ["--project-kanban-chip-bg" as any]: tone.chipBg,
    ["--project-kanban-chip-text" as any]: tone.chipText,
  };

  return (
    <div className="project-task-kanban-card" style={cardStyle}>
      <div className="project-task-kanban-card__header">
        <div className="project-task-kanban-card__header-left">
          <span className="project-task-kanban-card__priority">{priority}</span>
        </div>

        <div className="project-task-kanban-card__header-right">
          <span className="project-task-kanban-card__project-avatar">
            {projectInitials}
          </span>
          <button
            type="button"
            className="project-task-kanban-card__menu"
            tabIndex={-1}
            aria-label="Task options"
          >
            <SolidIcon name="si-ellipsis-v" aria-hidden />
          </button>
        </div>
      </div>

      <div className="project-task-kanban-card__title" title={title}>
        {title}
      </div>

      <div className="project-task-kanban-card__chips">
        <span className="project-task-kanban-card__chip project-task-kanban-card__chip--project">
          {project}
        </span>
        {milestoneLabel ? (
          <span className="project-task-kanban-card__chip project-task-kanban-card__chip--milestone">
            {milestoneLabel}
          </span>
        ) : null}
        {showStateChip ? (
          <span
            className={`project-task-kanban-card__chip project-task-kanban-card__chip--state project-task-kanban-card__chip--${stateTone}`}
          >
            {stateLabel}
          </span>
        ) : null}
      </div>

      <div className="project-task-kanban-card__signals">
        <span className="project-task-kanban-card__signal">
          <SolidIcon name="si-star" aria-hidden />
        </span>
        <span className="project-task-kanban-card__signal">
          <SolidIcon name="si-history" aria-hidden />
        </span>
      </div>

      <div className="project-task-kanban-card__meta">
        <span className="project-task-kanban-card__meta-item">
          <strong>{progress}</strong>
          <small>Progress</small>
        </span>
        <span className="project-task-kanban-card__meta-item">
          <strong>{spent}</strong>
          <small>Spent</small>
        </span>
        <span className="project-task-kanban-card__meta-item">
          <strong>{remaining}</strong>
          <small>Left</small>
        </span>
      </div>

      <div className="project-task-kanban-card__footer">
        <div className="project-task-kanban-card__footer-left">
          <span className="project-task-kanban-card__icon-label">
            <SolidIcon name="si-history" aria-hidden />
            <span
              className={
                isOverdue
                  ? "project-task-kanban-card__deadline project-task-kanban-card__deadline--overdue"
                  : "project-task-kanban-card__deadline"
              }
            >
              {hasDeadline ? deadlineText : "No deadline"}
            </span>
          </span>
        </div>

        <div className="project-task-kanban-card__footer-right">
          <span className="project-task-kanban-card__stage" title={stage}>
            {stage}
          </span>
        </div>
      </div>
    </div>
  );
}
