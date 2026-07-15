import { AdminKanbanPage } from "@solidxai/core-ui";
import { camelCase } from "lodash";
import { useParams } from "react-router-dom";

import { ProjectKanbanPage } from "../project-management/admin-layout/project/ProjectKanbanPage";
import { ProjectTaskKanbanPage } from "../project-management/admin-layout/project-task/ProjectTaskKanbanPage";

export function PatchedKanbanPage() {
  const params = useParams();
  const moduleName = params.moduleName || "";
  const modelName = params.modelName ? camelCase(params.modelName) : "";

  if (moduleName === "project-management" && modelName === "projectTask") {
    return <ProjectTaskKanbanPage />;
  }

  if (moduleName === "project-management" && modelName === "project") {
    return <ProjectKanbanPage />;
  }

  return <AdminKanbanPage />;
}
