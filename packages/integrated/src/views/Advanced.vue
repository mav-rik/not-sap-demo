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
import ODataEntitySet from 'notsapui/ODataEntitySet.vue'
import SmartTableRoot from 'notsapui/SmartTableRoot.vue'
import SmartTable from 'notsapui/SmartTable.vue'
import SmartTableFilters from 'notsapui/SmartTableFilters.vue'
import SmartRecordDialog from 'notsapui/SmartRecordDialog.vue'
import VuButton from 'vunor/Button.vue'
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
    // fieldsMap contains all available fields for this entity type
    const allFields = Array.from(es.fieldsMap.keys())

    // Special configuration for Orders entity set
    if (props.entitySet === 'Orders') {
        // Show only key fields relevant for table quick lookup
        columnsNames.value = ['OrderID', 'CustomerID', 'OrderDate', 'ShipName', 'ShipCity', 'ShipCountry']
        filtersNames.value = [ 'ShipName', 'ShipCity', 'ShipCountry' ]

        // Record dialog configuration for Orders
        recordTitle.value = 'CustomerID' // Use CustomerID as title
        recordSubtitle.value = 'OrderDate' // Use OrderDate as subtitle
        recordHeaderFields.value = ['OrderID', 'CustomerID', 'EmployeeID', 'OrderDate'] // Main fields in header

        // Group fields logically for the record dialog
        recordGroups.value = {
            'Order Information': ['RequiredDate', 'ShippedDate', 'ShipVia'],
            'Shipping Details': ['ShipName', 'ShipAddress', 'ShipCity', 'ShipRegion', 'ShipPostalCode', 'ShipCountry']
        }

        recordFieldSearch.value = true
    } else {
        // Default configuration for other entity sets
        columnsNames.value = allFields
        // Pre-select first 5 fields as default filters
        filtersNames.value = columnsNames.value.slice(0, 5) as TNorthwindModelOData['entityTypes'][ET]['fields'][]

        // Configure SmartRecordDialog display settings dynamically
        recordHeaderFields.value = allFields.slice(0, 2) // Show first 2 fields in header
        recordTitle.value = allFields.find(n => n.search('Name') >= 0) || '' // Use field with "Name" as title
        recordFieldSearch.value = allFields.length > 5 // Enable search if many fields
    }

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
const recordGroups = ref<Record<string, string[]>>() // Field groups for dialog
</script>

<template>
  <section
    class="layer-1 scope-neutral flex min-h-screen flex-col bg-surface-100 dark:bg-surface-900 md:h-screen md:overflow-hidden"
  >
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
            <div class="mx-auto flex w-full max-w-[1400px] flex-1 min-h-0 min-w-0 flex-col gap-$m md:flex-row px-$m py-$m">
                <!-- Sidebar: Filter controls and configuration -->
                <aside class="flex w-full flex-col gap-$m md:w-[260px] md:min-w-[220px] md:flex-shrink-0">

                    <!-- Header with entity name and controls -->
                    <h2 class="flex gap-$m items-center m-0 p-0 font-size-14px">
                        <div class="c8 rotate-90deg i--chevron-down size-20px opacity-60 hover:opacity-100" @click="home"></div>
                        <span class="opacity-60 inline-block max-w-150px text-ellipsis overflow-hidden">{{ entitySet }}</span>
                        <div class="flex-grow"></div>
                        <VuButton
                            class="c8-flat btn-round btn-square text-grey-800 dark:text-grey-300"
                            @click="isDark = !isDark"
                            :icon="isDark ? 'i--light-mode' : 'i--dark-mode'"
                        />
                    </h2>

                    <!-- Filter configuration button -->
                    <div class="flex items-center justify-start">
                        <h4 >Filters</h4>
                        <div class="flex-grow"></div>
                        <!-- showConfigDialog('filters') opens a dialog to choose which fields to filter by -->
                        <VuButton class="c8-flat btn-square" @click="showConfigDialog('filters')" icon="i--config" />
                    </div>

                    <div class="flex flex-col gap-4">
                        <!--
                          SmartTableFilters: Renders filter UI for each field in filters-names
                          - :filters-names - Array of field names to show filters for
                          - Automatically generates appropriate input controls based on field types
                          - Filter values are stored in fields-filters (bound via v-model in SmartTableRoot)
                        -->
                        <SmartTableFilters :filters-names="filtersNames" />

                        <!-- Search button uses queryImmediate from slot props to trigger data fetch -->
                        <VuButton class="c8-filled" :loading="querying" @click="queryImmediate">
                        Search
                        </VuButton>

                        <!-- Display record counts using slot props -->
                        <div class="flex w-full justify-end">
                        <div class="flex gap-$xs text-body-s text-grey-600 dark:text-grey-300 sm:items-end p-$m items-center">
                            <span>
                            Found {{ inlineCount ?? loadedCount ?? results?.length ?? 0 }} records{{ selectedCount ? ',' : '' }}
                            </span>
                            <span v-if="selectedCount"> {{ selectedCount }} selected</span>
                        </div>
                        </div>

                        <!-- Show active filter count and clear button when filters are applied -->
                        <footer v-if="fieldsFiltersCount" class="text-body-s p-$m flex rounded-$m layer-3 items-center justify-between">
                            <span>{{ fieldsFiltersCount }} active filters</span>
                            <!-- resetFilters from slot props clears all filter values -->
                            <VuButton class="c8-flat" @click="resetFilters">
                                Clear
                            </VuButton>
                        </footer>
                    </div>

                    <div class="flex-grow"></div>

                    <div class="flex gap-$l items-center justify-center">
                        <NotSapLogo small />
                    </div>
                </aside>

                <!-- Main content: Data table -->
                <div class="rounded-$l overflow-hidden">
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
                    <SmartTable sticky-header select="multi" class="max-h-full w-full mx-auto layer-0 relative" @item-dbl-click="showDetails"></SmartTable>
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
                class="layer-1 rounded-$l min-w-500px max-h-88vh"
                icon="i--details"
                modal
                overlay-class="bg-black/50 backdrop-blur-8px"
                :title-field="recordTitle"
                :subtitle-field="recordSubtitle"
                :groups="recordGroups"
                fetch-data
                v-model:open="displayDetails"
                :search="recordFieldSearch"
                :record="recordToDisplay"
                :header-fields="recordHeaderFields">
                <template v-slot:title v-if="!recordTitle">
                  {{entitySet}}
                </template>
                <template v-slot:subTitle v-if="!recordSubtitle">
                  Record Details
                </template>
            </SmartRecordDialog>

        </SmartTableRoot>
    </ODataEntitySet>
  </section>
</template>