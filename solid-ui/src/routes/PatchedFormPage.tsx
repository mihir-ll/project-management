import { AdminFormPage } from "@solidxai/core-ui";
import { camelCase } from "lodash";
import { useParams } from "react-router-dom";

import { ProjectTaskFormPage } from "../project-management/admin-layout/project-task/ProjectTaskFormPage";

export function PatchedFormPage() {
  const params = useParams();
  const moduleName = params.moduleName || "";
  const modelName = params.modelName ? camelCase(params.modelName) : "";

  if (moduleName === "project-management" && modelName === "projectTask") {
    return <ProjectTaskFormPage />;
  }

  return <AdminFormPage />;
}
