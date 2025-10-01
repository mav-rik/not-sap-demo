# Bundled Demo - notsapui + notsapodata

This demo hits the Northwind OData V2 service with `notsapui` components and the `notsapodata` client. Everything is prebuilt, so you can drop it into any Vue project with almost no setup.

## Two Demo Views

### 1. Minimal View ([src/views/Minimal.vue](src/views/Minimal.vue))

- Loads data automatically with `query-on-mount`
- Click a row to open the read-only record dialog
- Columns come straight from OData metadata
- Shows the smallest amount of code needed

<img src="../../docs/table-record.gif" alt="Minimal View Demo" />

**Key takeaway**: a full table with almost zero configuration.

### 2. Advanced View ([src/views/Advanced.vue](src/views/Advanced.vue))

**Dynamic filtering with `SmartTableFilters`:**

<img src="../../docs/adv-filters.gif" alt="Dynamic Filtering" />

- Checkbox multi-select and filter sidebar
- Column chooser dialog to hide/show fields
- Double-click to open the record dialog

<img src="../../docs/adv-columns.gif" alt="Column Configuration" />
<img src="../../docs/adv-record.gif" alt="Record Details" />

**Renderless scope access:**
- `queryImmediate()`, `resetFilters()`, `showConfigDialog()` helpers
- `querying`, `inlineCount`, `loadedCount`, `results` state

**Two-way bindings:**
- `columns-names`, `filters-names`, `fields-filters`, `selected-rows`

**Key takeaway**: customize the layout while reusing notsapui’s data logic.

## The Bundled Approach Explained

### Component Imports

```typescript
import { ODataEntitySet, SmartTableRoot, SmartTable, SmartTableFilters, SmartRecordDialog } from 'notsapui'
```

Everything ships compiled—no `.vue` sources or extra build steps.

### Minimal Dependencies

```json
{
  "dependencies": {
    "notsapui": "^0.0.11",
    "notsapodata": "^0.0.11",
    "vue": "^3.5.18",
    "vue-router": "^4.5.1"
  }
}
```

No `vunor`, `radix-vue`, `@internationalized/date`, `@tanstack/vue-virtual`, or UnoCSS—the bundle already includes them.

### Styles Import

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'notsapui/styles.css'
```

Import your preferred CSS reset first for consistent rendering:

```typescript
import 'modern-normalize'
import 'notsapui/styles.css'
```

### Vite Configuration

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import notSapODataVitePlugin from 'notsapodata/vite'

export default defineConfig({
  plugins: [
    vue(),
    notSapODataVitePlugin({
      services: {
        NORTHWIND_V2: {
          alias: 'NorthwindModel',
          path: '/V2/Northwind/Northwind.svc',
        },
      },
    }),
  ],
})
```

No other plugins required.

## Benefits of the Bundled Approach

- Immediate setup with a single CSS import
- Minimal dependencies to manage
- Zero build configuration changes

## Trade-offs

- Styling confined to CSS variables or overrides
- Bundle includes styles for every component
- Component internals stay opaque

## Project Setup

```sh
pnpm install
pnpm dev           # inside the package
pnpm demo-bundled  # from repo root
```

## OData Integration

### Type Generation

```typescript
notSapODataVitePlugin({
  services: {
    NORTHWIND_V2: {
      alias: 'NorthwindModel',
      path: '/V2/Northwind/Northwind.svc',
    },
  },
})
```

Types land in `.odata.types.ts`:

```typescript
import { NorthwindModel } from '@/.odata.types'

const model = NorthwindModel.getInstance()
const entitySet = await model.entitySet('Products')
```

### Proxy Configuration

OData requests are proxied through [odata-proxy.ts](odata-proxy.ts) during development.

