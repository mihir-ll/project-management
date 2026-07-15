import {
  ExtensionComponentTypes,
  ExtensionFunctionTypes,
  type SolidUiModule,
} from "@solidxai/core-ui";
import ProjectKanbanCardWidget from "./admin-layout/project/extension-components/ProjectKanbanCardWidget";
import ProjectTaskKanbanCardWidget from "./admin-layout/project-task/extension-components/ProjectTaskKanbanCardWidget";

// Import extension components and functions per model, e.g.:
// import ExampleWidget from "./admin-layout/{model-name}/extension-components/ExampleWidget";
// import exampleChangeHandler from "./admin-layout/{model-name}/extension-functions/exampleChangeHandler";

// Import Redux API slices, e.g.:
// import { exampleApi } from "./redux/exampleApi";

// This file is auto-discovered by solid-ui-modules.ts via import.meta.glob.
ProjectKanbanCardWidget;
ProjectTaskKanbanCardWidget;
const moduleUiModule = {
  name: "project-management",
  extensionComponents: [
    // { name: "ExampleWidget", component: ExampleWidget, type: ExtensionComponentTypes.formWidget },
    {
      name: "ProjectKanbanCardWidget",
      component: ProjectKanbanCardWidget,
      type: ExtensionComponentTypes.kanbanCardWidget,
    },
    {
      name: "ProjectTaskKanbanCardWidget",
      component: ProjectTaskKanbanCardWidget,
      type: ExtensionComponentTypes.kanbanCardWidget,
    },
  ],
  extensionFunctions: [
    // { name: "exampleChangeHandler", fn: exampleChangeHandler, type: ExtensionFunctionTypes.onFieldChange },
  ],
  reducers: {
    // [exampleApi.reducerPath]: exampleApi.reducer,
  },
  middlewares: [
    // exampleApi.middleware,
  ],
} satisfies SolidUiModule;

export default moduleUiModule;
