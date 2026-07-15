# project-management — solid-ui module

## Structure

```
project-management/
├── project-management.ui-module.ts    ← module registry (auto-discovered)
├── admin-layout/                   ← use custom-layout/ for bespoke routes
│   └── {model-name}/               ← matches the model key in SolidX
│       ├── extension-components/   ← custom React components
│       └── extension-functions/    ← event handlers
└── redux/                          ← RTK Query APIs / Redux slices (optional)
```
