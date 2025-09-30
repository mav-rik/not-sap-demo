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
import { ODataEntitySet, SmartTableRoot, SmartTable, SmartRecordDialog } from 'notsapui'
import NotSapLogo from '@/components/not-sap-logo.vue';
import IconDetails from '@/components/icons/IconDetails.vue';
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
    columnsNames.value = Array.from(es.fieldsMap.keys())

    // Configure SmartRecordDialog display settings dynamically
    recordHeaderFields.value = columnsNames.value.slice(0, 2) // Show first 2 fields in header
    recordTitle.value = columnsNames.value.find(n => n.search('Name') >= 0) || '' // Use field with "Name" as title
    recordFieldSearch.value = columnsNames.value.length > 5 // Enable search if many fields

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
const recordHeaderFields = ref([] as string[]) // Fields to show in dialog header
const recordFieldSearch = ref(false) // Enable/disable field search in dialog

function home() {
    router.push({ name:'welcome' })
}
</script>

<template>
  <section class="minimal-section layer-2">
    <div class="minimal-header" @click="home">
      <NotSapLogo small />
    </div>
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
            <div class="table-container">
              <SmartTable sticky-header class="smart-table" @item-click="showDetails"></SmartTable>
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
                class="record-dialog layer-1"
                modal
                overlay-class="dialog-overlay"
                :title-field="recordTitle"
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
.minimal-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 0;
}

.minimal-header {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--scope-light-0);
  backdrop-filter: blur(12px);
  z-index: 10;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 0 0 1em 1em;
  transform-origin: 50% 0;
  transform: scale(0.7);
  transition: transform 0.2s ease;
  cursor: pointer;
}

.dark .minimal-header {
  background-color: var(--scope-dark-0);
}

.minimal-header:hover {
  transform: scale(1);
}

.table-container {
  border-radius: 0.75rem;
  overflow: hidden;
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.smart-table {
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
  --current-bg: var(--scope-light-0);
  background-color: rgb(var(--scope-light-0));
}

.dark .smart-table {
  --current-bg: var(--scope-dark-0);
  background-color: rgb(var(--scope-dark-0));
}

.record-dialog {
  max-height: 100vh;
}

@media (min-width: 768px) {
  .minimal-section {
    height: 100vh;
    overflow: hidden;
  }
}
</style>