<script setup lang="ts">
/**
 * Minimal Table View - notsapui + notsapodata Demo
 *
 * This component demonstrates the minimal setup needed to display OData in a table
 * with record detail view.
 *
 * Key Concepts:
 *
 * 1. OData Model (notsapodata):
 *    - Import your generated model class (e.g., NorthwindModel) from .odata.types.ts
 *    - Get a singleton instance with Model.getInstance()
 *    - Use model.entitySet(name) to access entity sets
 *
 * 2. UI Components (notsapui):
 *    - ODataEntitySet: Wrapper that provides OData context to child components
 *    - SmartTableRoot: Manages table state (columns, filters, sorting, pagination)
 *    - SmartTable: Renders the actual data table with automatic column generation
 *    - SmartRecordDialog: Modal dialog showing detailed view of a single record
 *
 * 3. Minimal Setup:
 *    - Pass :model and :entity-set to ODataEntitySet
 *    - Pass :columns-names to SmartTableRoot (all fields from the entity set)
 *    - Add query-on-mount to automatically load data when component mounts
 *    - Handle @item-click event from SmartTable to show record details
 *    - SmartRecordDialog displays all fields of the selected record
 */

import { NorthwindModel, type TNorthwindModelOData } from '@/.odata.types';
import ODataEntitySet from 'notsapui/ODataEntitySet.vue'
import SmartTableRoot from 'notsapui/SmartTableRoot.vue'
import SmartTable from 'notsapui/SmartTable.vue'
import SmartRecordDialog from 'notsapui/SmartRecordDialog.vue';
import NotSapLogo from '@/components/not-sap-logo.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
    entitySet: keyof TNorthwindModelOData['entitySets']
}>()

// Step 1: Get OData model instance (singleton pattern)
const model = NorthwindModel.getInstance()

// Step 2: Extract all field names from the entity set to use as columns
const columnsNames = ref<string[]>()
const loading = ref(false)

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

        // Configure SmartRecordDialog display settings dynamically
        recordHeaderFields.value = allFields.slice(0, 2) // Show first 2 fields in header
        recordTitle.value = allFields.find(n => n.search('Name') >= 0) || '' // Use field with "Name" as title
        recordFieldSearch.value = allFields.length > 5 // Enable search if many fields
    }

    loading.value = false
}

onMounted(init)

// State for SmartRecordDialog
const recordToDisplay = ref<Record<string, unknown>>() // The selected record to display
const displayDetails = ref(false) // Controls dialog visibility

// Event handler for table row clicks - opens detail dialog
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

function home() {
    router.push({ name:'welcome' })
}
</script>

<template>
  <section
    class="layer-2 scope-neutral flex min-h-screen flex-col items-center bg-surface-100 dark:bg-surface-900 md:h-screen md:overflow-hidden py-$xl"
  >
    <!-- <div class="absolute top-0 flex items-center gap-$l layer-0 bg-opacity-55 backdrop-blur-12px z-10 shadow-lg p-$m scale-70 hover:scale-100 transition-200" style="border-radius: 0 0 1em 1em; transform-origin: 50% 0;" @click="home">
      <NotSapLogo small />
    </div> -->
    <!--
      ODataEntitySet: Root component that connects notsapodata model with notsapui components
      - :model - OData model instance (provides metadata and query capabilities)
      - :entity-set - The entity set name to work with (e.g., 'Products', 'Orders')
    -->
    <ODataEntitySet :model :entity-set v-if="!loading">
        <!--
          SmartTableRoot: Manages table state and business logic
          - :columns-names - Array of field names to display as columns
          - query-on-mount - Automatically fetch data when component mounts

          This component handles:
          - Data fetching and pagination
          - Column configuration
          - Filters and sorting state
          - Row selection
        -->
        <SmartTableRoot :columns-names query-on-mount>
            <!--
              SmartTable: Renders the actual table UI
              - sticky-header - Keeps header visible while scrolling
              - @item-click - Event emitted when a row is clicked, receives the row data

              Features included by default:
              - Automatic column generation from metadata
              - Sortable columns
              - Resizable columns
              - Data type formatting
              - Loading states
              - Row click interactions
            -->
            <div class="rounded-$l overflow-hidden max-h-full max-w-full mx-auto shadow-lg">
              <SmartTable sticky-header class="max-h-full max-w-full mx-auto layer-0" @item-click="showDetails"></SmartTable>
            </div>

            <!--
              SmartRecordDialog: Modal dialog for displaying detailed record view
              - v-model:open - Controls dialog visibility (two-way binding)
              - :record - The record data to display
              - :title-field - Field name to use as the dialog title
              - :subtitle-field - Field name to use as the dialog subtitle
              - :header-fields - Array of field names to highlight in the header section
              - fetch-data - Automatically fetch full record details from OData service
              - :search - Enable search functionality across fields (useful for large records)
              - modal - Display as a modal dialog
              - overlay-class - CSS classes for the modal overlay

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