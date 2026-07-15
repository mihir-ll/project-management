import { getSolidRoutes } from "@solidxai/core-ui";
import { useRoutes } from "react-router-dom";

import { solidUiModuleRuntime } from "./solid-ui-modules";
import { PatchedFormPage } from "./routes/PatchedFormPage";
import { PatchedKanbanPage } from "./routes/PatchedKanbanPage";

export function AppRoutes() {
  const routes = getSolidRoutes({
    ...solidUiModuleRuntime.routes,
    elementOverrides: {
      form: <PatchedFormPage />,
      kanban: <PatchedKanbanPage />,
    },
  });

  return useRoutes(routes);
}
