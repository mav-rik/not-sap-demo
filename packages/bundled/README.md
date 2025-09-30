# Bundled Demo - notsapui + notsapodata

This demo showcases OData integration with the Northwind V2 service using `notsapui` and `notsapodata` libraries. The bundled approach provides pre-built components with compiled styles, making it easy to drop into any project with minimal configuration.

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

## The Bundled Approach Explained

### Component Imports

Import pre-compiled components from the `notsapui` package:

```typescript
import { ODataEntitySet, SmartTableRoot, SmartTable, SmartTableFilters, SmartRecordDialog } from 'notsapui'
```

All components are pre-built and ready to use - no raw `.vue` files, no build-time compilation required.

### Minimal Dependencies

The bundled approach requires minimal dependencies:

```json
{
  "dependencies": {
    "notsapui": "workspace:^",
    "notsapodata": "workspace:^",
    "vue": "^3.5.18",
    "vue-router": "^4.5.1"
  }
}
```

**Why so few dependencies?**

- **No `vunor`** - Styles are pre-compiled into the bundle
- **No `radix-vue`** - Already bundled with notsapui components
- **No `@internationalized/date`** - Already bundled with notsapui
- **No `@tanstack/vue-virtual`** - Already bundled with notsapui
- **No UnoCSS** - All styles are pre-generated and included

### Styles Import

Simply import the pre-compiled CSS file in your application entry point:

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'notsapui/styles.css'  // All styles included

const app = createApp(App)
app.use(router)
app.mount('#app')
```

That's it - no CSS framework configuration needed!

### CSS Reset Recommendation

For optimal appearance, it's recommended to use a CSS reset to ensure components look as designed across different browsers:

```typescript
// main.ts
import 'modern-normalize'  // or your preferred CSS reset
import 'notsapui/styles.css'
```

Popular CSS reset options:
- `modern-normalize`
- `normalize.css`
- `@unocss/reset/tailwind.css`

### Vite Configuration

No special Vite plugins required - just the OData type generator:

```typescript
// vite.config.ts
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
  ]
})
```

Notice: No UnoCSS plugin, no additional build tooling.

## Benefits of the Bundled Approach

- **Quick Setup** - Import styles and start using components immediately
- **Minimal Configuration** - No CSS framework setup required
- **Fewer Dependencies** - Everything bundled in notsapui package

## Trade-offs

- **Limited Customization** - Styling limited to CSS variables and custom CSS
- **Larger Bundle** - Includes all component styles even if unused
- **Less Flexibility** - Cannot modify component internals or use custom design tokens
- **Build Overhead** - Components are pre-compiled, can't leverage your build optimizations

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
pnpm demo-bundled
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

