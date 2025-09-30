<script setup lang="ts" generic="T extends keyof TNorthwindModelOData['entitySets'], ET extends TNorthwindModelOData['entitySets'][T]">
/**
 * Advanced Table View - notsapui + notsapodata Demo
 *
 * This component demonstrates advanced features of notsapui including:
 * - Dynamic filters with SmartTableFilters
 * - Multi-row selection
 * - Column configuration
 * - Record details on double-click
 * - Custom layout with sidebar
 *
 * Key Concepts:
 *
 * 1. OData Model (notsapodata):
 *    - Same as minimal view - uses Model.getInstance() and model.entitySet()
 *
 * 2. UI Components (notsapui):
 *    - ODataEntitySet: Provides OData context to child components
 *    - SmartTableRoot: Manages table state with v-model bindings for full control
 *    - SmartTable: Renders table with multi-select capability
 *    - SmartTableFilters: Provides UI for filtering data by selected fields
 *    - SmartRecordDialog: Shows detailed record view on double-click
 *
 * 3. Advanced Features:
 *    - Two-way binding with v-model for columns-names, filters-names, fields-filters, selected-rows
 *    - Access to SmartTableRoot's slot props for custom UI (querying state, counts, actions)
 *    - Dynamic filter configuration - choose which fields to filter by
 *    - showConfigDialog() to let users customize visible columns and filters
 *    - resetFilters() to clear all active filters
 *    - Double-click to open record details dialog
 */

import { NorthwindModel, type TNorthwindModelOData } from '@/.odata.types';
import { ODataEntitySet, SmartTableRoot, SmartTable, SmartTableFilters, SmartRecordDialog } from 'notsapui'
import AppButton from '@/components/AppButton.vue'
import IconLightDarkLoop from '@/components/icons/IconLightDarkLoop.vue'
import IconDetails from '@/components/icons/IconDetails.vue'
import { computed, onMounted, ref } from 'vue';
import type { TODataFieldsFilters } from 'notsapodata';
import NotSapLogo from '@/components/not-sap-logo.vue';
import { useRouter } from 'vue-router'
import { useDark } from '@vueuse/core'

const isDark = useDark()

const router = useRouter()
const props = defineProps<{
    entitySet: T
}>()

// Step 1: Get OData model instance (singleton pattern)
const model = NorthwindModel.getInstance()

// Step 2: State management for SmartTableRoot
// Using v-model bindings allows full control over table state from parent component
const columnsNames = ref<string[]>() // Visible columns in the table
const filtersNames = ref<TNorthwindModelOData['entityTypes'][ET]['fields'][]>([]) // Fields available for filtering
const fieldsFilters = ref<TODataFieldsFilters>({}) // Active filter values (e.g., {ProductName: {contains: 'Chai'}})
const loading = ref(false)

// Step 3: Multi-row selection state
const selectedRows = ref<(Record<string, string>)[]>([]) // Array of selected row objects
const selectedCount = computed(() => selectedRows.value.length) // Reactive count of selected rows

async function init() {
    loading.value = true
    // Get entity set instance to access metadata
    const es = await model.entitySet(props.entitySet)
    // Extract all field names from the entity type
    columnsNames.value = Array.from(es.fieldsMap.keys())
    // Pre-select first 5 fields as default filters
    filtersNames.value = columnsNames.value.slice(0, 5) as TNorthwindModelOData['entityTypes'][ET]['fields'][]

    // Configure SmartRecordDialog display settings dynamically
    recordHeaderFields.value = columnsNames.value.slice(0, 2) // Show first 2 fields in header
    recordTitle.value = columnsNames.value.find(n => n.search('Name') >= 0) || '' // Use field with "Name" as title
    recordSubtitle.value = columnsNames.value[0] || '' // Use first field as subtitle
    recordFieldSearch.value = columnsNames.value.length > 5 // Enable search if many fields

    loading.value = false
}

onMounted(init)

function home() {
    router.push({ name:'welcome' })
}

// State for SmartRecordDialog
const recordToDisplay = ref<Record<string, unknown>>() // The selected record to display
const displayDetails = ref(false) // Controls dialog visibility

// Event handler for table row double-clicks - opens detail dialog
function showDetails(item: Record<string, unknown>) {
    recordToDisplay.value = item
    displayDetails.value = true
}

// SmartRecordDialog configuration
const recordTitle = ref('') // Field name to use as dialog title
const recordSubtitle = ref('') // Field name to use as dialog subtitle
const recordHeaderFields = ref([] as string[]) // Fields to show in dialog header
const recordFieldSearch = ref(false) // Enable/disable field search in dialog
</script>

<template>
  <section class="advanced-section layer-1">
    <!--
      ODataEntitySet: Root component that connects notsapodata model with notsapui components
      - :model - OData model instance
      - :entity-set - The entity set name to work with
    -->
    <ODataEntitySet :model :entity-set>
        <!--
          SmartTableRoot: Advanced usage with v-model bindings and slot props

          Props:
          - query-on-mount - Automatically fetch data when component mounts
          - :top - OData $top parameter (limits results per page, default 40)
          - v-model:columns-names - Two-way binding for visible columns (allows parent control)
          - v-model:filters-names - Two-way binding for which fields have filter UI
          - v-model:fields-filters - Two-way binding for active filter values
          - v-model:selected-rows - Two-way binding for multi-select state

          Slot Props (accessed via v-slot):
          - showConfigDialog('filters' | 'columns') - Open configuration dialog
          - querying - Boolean indicating if data is being fetched
          - queryImmediate - Function to trigger immediate data fetch
          - inlineCount - Total record count from OData $inlinecount
          - loadedCount - Number of records loaded so far
          - results - Current result set array
          - resetFilters - Function to clear all active filters
          - fieldsFiltersCount - Number of active filters
        -->
        <SmartTableRoot
            query-on-mount
            :top="40"
            v-model:columns-names="columnsNames"
            v-model:filters-names="filtersNames"
            v-model:fields-filters="fieldsFilters"
            v-model:selected-rows="selectedRows"
            v-slot="{ showConfigDialog, querying, queryImmediate, inlineCount, loadedCount, results, resetFilters, fieldsFiltersCount }"
        >

            <!-- Custom layout with sidebar for filters and main content area for table -->
            <div class="advanced-layout">
                <!-- Sidebar: Filter controls and configuration -->
                <aside class="advanced-sidebar">

                    <!-- Header with entity name and controls -->
                    <h2 class="sidebar-header">
                        <div class="back-button i--chevron-down" @click="home" style="transform: rotate(90deg)"></div>
                        <span class="entity-name">{{ entitySet }}</span>
                        <div class="spacer"></div>
                        <button
                            class="theme-button"
                            @click="isDark = !isDark"
                        >
                          <IconLightDarkLoop />
                        </button>
                    </h2>

                    <!-- Filter configuration button -->
                    <div class="filter-header">
                        <h4>Filters</h4>
                        <div class="spacer"></div>
                        <!-- showConfigDialog('filters') opens a dialog to choose which fields to filter by -->
                        <AppButton class="config-button" @click="showConfigDialog('filters')" icon="i--config" />
                    </div>

                    <div class="filter-controls">
                        <!--
                          SmartTableFilters: Renders filter UI for each field in filters-names
                          - :filters-names - Array of field names to show filters for
                          - Automatically generates appropriate input controls based on field types
                          - Filter values are stored in fields-filters (bound via v-model in SmartTableRoot)
                        -->
                        <SmartTableFilters :filters-names="filtersNames" />

                        <!-- Search button uses queryImmediate from slot props to trigger data fetch -->
                        <AppButton class="search-button" :loading="querying" @click="queryImmediate">
                        Search
                        </AppButton>

                        <!-- Display record counts using slot props -->
                        <div class="record-counts">
                        <div class="record-counts__content">
                            <span>
                            Found {{ inlineCount ?? loadedCount ?? results?.length ?? 0 }} records{{ selectedCount ? ',' : '' }}
                            </span>
                            <span v-if="selectedCount"> {{ selectedCount }} selected</span>
                        </div>
                        </div>

                        <!-- Show active filter count and clear button when filters are applied -->
                        <footer v-if="fieldsFiltersCount" class="active-filters">
                            <span>{{ fieldsFiltersCount }} active filters</span>
                            <!-- resetFilters from slot props clears all filter values -->
                            <AppButton class="clear-button" @click="resetFilters">
                                Clear
                            </AppButton>
                        </footer>
                    </div>

                    <div class="spacer-grow"></div>

                    <div class="sidebar-footer">
                        <NotSapLogo small />
                    </div>
                </aside>

                <!-- Main content: Data table -->
                <div class="table-wrapper">
                    <!--
                      SmartTable: Renders the data table with advanced features
                      - sticky-header - Keeps header visible while scrolling
                      - select="multi" - Enable multi-row selection with checkboxes
                      - @item-dbl-click - Event emitted when a row is double-clicked

                      Features in advanced view:
                      - Column sorting (click header)
                      - Column resizing (drag divider)
                      - Multi-row selection
                      - Pagination (virtual scrolling)
                      - Double-click to view record details
                    -->
                    <SmartTable sticky-header select="multi" class="advanced-table" @item-dbl-click="showDetails"></SmartTable>
                </div>
            </div>

            <!--
              SmartRecordDialog: Modal dialog for displaying detailed record view
              Triggered by double-clicking a table row (@item-dbl-click event)

              Props:
              - v-model:open - Controls dialog visibility (two-way binding)
              - :record - The record data to display
              - :title-field - Field name to use as the dialog title
              - :subtitle-field - Field name to use as the dialog subtitle
              - :header-fields - Array of field names to highlight in the header section
              - fetch-data - Automatically fetch full record details from OData service
              - :search - Enable search functionality across fields (useful for large records)
              - modal - Display as a modal dialog
              - overlay-class - CSS classes for the modal overlay
              - icon - Icon to display in the header

              The dialog automatically displays all fields from the record with proper formatting.
              Use slots (title, subTitle) to customize the header display.
            -->
            <SmartRecordDialog
                class="record-dialog layer-1"
                modal
                overlay-class="dialog-overlay"
                :title-field="recordTitle"
                :subtitle-field="recordSubtitle"
                fetch-data
                v-model:open="displayDetails"
                :search="recordFieldSearch"
                :record="recordToDisplay"
                :header-fields="recordHeaderFields">
                <template v-slot:header-icon>
                  <IconDetails />
                </template>
                <template v-slot:title v-if="!recordTitle">
                  {{entitySet}}
                </template>
                <template v-slot:subTitle>
                  Record Details
                </template>
            </SmartRecordDialog>

        </SmartTableRoot>
    </ODataEntitySet>
  </section>
</template>

<style>
.advanced-section {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.advanced-layout {
  margin: 0 auto;
  display: flex;
  width: 100%;
  max-width: 1400px;
  flex: 1;
  min-height: 0;
  min-width: 0;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.advanced-sidebar {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
}

.sidebar-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
}

.back-button {
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.back-button:hover {
  opacity: 1;
}

.entity-name {
  opacity: 0.6;
  display: inline-block;
  max-width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.spacer {
  flex-grow: 1;
}

.spacer-grow {
  flex-grow: 1;
}

.theme-button {
  background-color: transparent !important;
  border-radius: 50%;
  padding: 0rem;
  width: 2.5rem;
  height: 2.5rem;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.filter-header h4 {
  margin: 0;
}

.config-button {
  background-color: transparent !important;
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
}

.filter-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-button {
  width: 100%;
  background-color: var(--primary) !important;
}

.record-counts {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.record-counts__content {
  display: flex;
  gap: 0.25rem;
  font-size: 0.875rem;
  padding: 0.5rem;
  align-items: center;
  opacity: 0.7;
}

.active-filters {
  font-size: 0.875rem;
  padding: 0.5rem;
  display: flex;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: space-between;
}

.clear-button {
  background-color: transparent !important;
  padding: 0.5rem 1rem;
}

.sidebar-footer {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.table-wrapper {
  border-radius: 0.75rem;
  overflow: hidden;
}

.advanced-table {
  max-height: 100%;
  width: 100%;
  margin: 0 auto;
  position: relative;
  --current-bg: var(--scope-light-0);
  background-color: rgb(var(--scope-light-0));
}

.dark .advanced-table {
  --current-bg: var(--scope-dark-0);
  background-color: rgb(var(--scope-dark-0));
}

.record-dialog {
  max-height: 100vh;
}

@media (min-width: 768px) {
  .advanced-section {
    height: 100vh;
    overflow: hidden;
  }

  .advanced-layout {
    flex-direction: row;
  }

  .advanced-sidebar {
    width: 260px;
    min-width: 220px;
    flex-shrink: 0;
  }
}
</style>