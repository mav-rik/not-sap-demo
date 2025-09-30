# Integrated Demo - notsapui + notsapodata

This demo showcases OData integration with the Northwind V2 service using `notsapui` and `notsapodata` libraries. The integrated approach gives you complete control over component styling and behavior by importing raw `.vue` components and managing your own CSS framework.

## Two Demo Views

### 1. Minimal View ([src/views/Minimal.vue](src/views/Minimal.vue))

Simple out-of-the-box table implementation demonstrating the minimal setup:

- Automatic OData data fetching with `query-on-mount`
- Click rows to view detailed record information
- Automatic column generation from OData metadata
- Demonstrates the simplest possible configuration

<img src="../../docs/table-record.gif" alt="Minimal View Demo" />

**Key takeaway**: Shows how little code is needed to get a fully functional OData table.

### 2. Advanced View ([src/views/Advanced.vue](src/views/Advanced.vue))

Full-featured implementation showcasing advanced capabilities:

**Dynamic filtering with `SmartTableFilters` component:**

<img src="../../docs/adv-filters.gif" alt="Dynamic Filtering" />

- Multi-row selection with checkboxes
- Custom layout with sidebar for filters

**Column configuration dialog (choose which columns to display):**

<img src="../../docs/adv-columns.gif" alt="Column Configuration" />

**Double-click rows to view record details:**

<img src="../../docs/adv-record.gif" alt="Record Details" />

**Access to renderless scopes** - slot props that expose internal state and methods:
- `queryImmediate()` - Trigger data fetching manually
- `resetFilters()` - Clear all active filters
- `showConfigDialog()` - Open configuration dialogs
- `querying`, `inlineCount`, `loadedCount`, `results` - Access to query state

**Two-way binding with `v-model`** for full parent control over:
- `columns-names` - Visible columns
- `filters-names` - Available filter fields
- `fields-filters` - Active filter values
- `selected-rows` - Selected row data

**Key takeaway**: Demonstrates how to build custom UIs while leveraging notsapui's internal logic through renderless scope patterns.

## The Integrated Approach Explained

### Component Imports

Import raw `.vue` components directly from `notsapui`:

```typescript
import ODataEntitySet from 'notsapui/ODataEntitySet.vue'
import SmartTableRoot from 'notsapui/SmartTableRoot.vue'
import SmartTable from 'notsapui/SmartTable.vue'
import SmartTableFilters from 'notsapui/SmartTableFilters.vue'
import SmartRecordDialog from 'notsapui/SmartRecordDialog.vue'
```

This approach gives you access to the raw Vue components, allowing your build process to handle compilation and tree-shaking.

### Why These Dependencies?

Since `notsapui` is built on top of `vunor` (UnoCSS-based component library) and `radix-vue` (headless UI primitives), the integrated approach requires you to include these peer dependencies:

```json
{
  "dependencies": {
    "notsapui": "workspace:^",
    "notsapodata": "workspace:^",
    "vunor": "^0.0.29",
    "radix-vue": "^1.9.17",
    "@internationalized/date": "^3.9.0",
    "@tanstack/vue-virtual": "^3.13.12"
  }
}
```

**Why each dependency is needed:**

- **`vunor`** - Component library providing base styling and UI primitives using UnoCSS. Since notsapui components use vunor internally, you need it in your project.

- **`radix-vue`** - Headless component primitives that provide accessibility, keyboard navigation, and component behavior. Vunor is built on top of radix-vue.

- **`@internationalized/date`** - Handles date/time parsing, formatting, and timezone management for date fields in OData entities.

- **`@tanstack/vue-virtual`** - Enables virtual scrolling for large tables. When displaying thousands of rows, only visible rows are rendered in the DOM for optimal performance.

### UnoCSS Configuration

You must configure UnoCSS with the required presets from `vunor` and `notsapui`:

```typescript
// uno.config.ts
import { defineConfig, type Preset } from 'unocss'
import { presetVunor, vunorShortcuts } from 'vunor/theme'
import { notSapUiVunorShortcuts } from 'notsapui/vunor'
import { notSapIconsPreset } from 'notsapui/icons'

export default defineConfig({
  presets: [
    presetVunor({ baseRadius: '0.25em' }) as Preset,
    notSapIconsPreset({ /* icon mappings */ })
  ],
  shortcuts: [vunorShortcuts(notSapUiVunorShortcuts)]
})
```

**Why UnoCSS is required:**

- `notsapui` components use UnoCSS utility classes for styling
- `presetVunor` provides the design system (colors, spacing, typography)
- `notSapUiVunorShortcuts` provides component-specific utility shortcuts
- `notSapIconsPreset` enables icon usage with the `i--icon-name` syntax

### Vite Plugin Setup

Include the UnoCSS Vite plugin in your config:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import notSapODataVitePlugin from 'notsapodata/vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),  // Required for integrated approach
    notSapODataVitePlugin({
      services: {
        NORTHWIND_V2: {
          alias: 'NorthwindModel',
          path: '/V2/Northwind/Northwind.svc',
        },
      },
    }),
  ]
})
```

### Application Entry Point

Import UnoCSS styles in your main entry file:

```typescript
// main.ts
import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'  // CSS reset
import App from './App.vue'
import router from './router'
import 'uno.css'  // UnoCSS generated styles

const app = createApp(App)
app.use(router)
app.mount('#app')
```

## Benefits of the Integrated Approach

- **Full Style Control** - Use UnoCSS utilities to customize component appearance
- **Tree-Shaking** - Only CSS for used components is included in the bundle
- **Smaller Bundle Size** - UnoCSS generates minimal CSS based on actual usage
- **Flexibility** - Access to raw components allows deep customization
- **Modern Tooling** - Leverages Vite's build optimizations

## Trade-offs

- **More Configuration** - Requires UnoCSS setup and peer dependencies
- **Build Complexity** - Your build process must handle Vue SFC compilation
- **Dependency Management** - You must ensure peer dependencies are compatible

## Project Setup

### Install Dependencies

```sh
pnpm install
```

### Development

```sh
pnpm dev
```

Or from the monorepo root:

```sh
pnpm demo-integrated
```

## OData Integration

### Type Generation

OData TypeScript types are automatically generated by the `notsapodata/vite` plugin from service metadata:

```typescript
// vite.config.ts
notSapODataVitePlugin({
  services: {
    NORTHWIND_V2: {
      alias: 'NorthwindModel',
      path: '/V2/Northwind/Northwind.svc',
    },
  },
})
```

This generates `.odata.types.ts` with full type definitions for all entity sets, entity types, and fields:

```typescript
import { NorthwindModel, type TNorthwindModelOData } from '@/.odata.types'

const model = NorthwindModel.getInstance()
const entitySet = await model.entitySet('Products')
```

### Proxy Configuration

OData requests are proxied to the public Northwind service via [odata-proxy.ts](odata-proxy.ts).

