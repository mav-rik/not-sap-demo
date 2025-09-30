<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppCardHeader from '@/components/AppCardHeader.vue'
import IconLightDarkLoop from '@/components/icons/IconLightDarkLoop.vue'
import IconTable from '@/components/icons/IconTable.vue'
import IconDashboard from '@/components/icons/IconDashboard.vue'
import { useDark } from '@vueuse/core'
import { NorthwindModel } from '@/.odata.types'
import NotSapLogo from '@/components/not-sap-logo.vue'
import { selectedEntitySet, selectedUiType } from '@/app-state'

const isDark = useDark()
const router = useRouter()

const model = NorthwindModel.getInstance()

const entitySets = ref<Array<{ value: string; label: string }>>([])
const loading = ref(true)

const uiTypes = [
  { value: 'minimal', label: 'Minimal Table', icon: IconTable },
  { value: 'advanced', label: 'Advanced Table', icon: IconDashboard },
] as const

const canProceed = computed(() => selectedEntitySet.value && selectedUiType.value)

const headerGradient = computed(() =>
  `background: linear-gradient(120deg, #0aa7ea -60%, ${isDark.value ? '#252729' : '#ffffff'} 20%, #0aa7ea25 100%);`
)

onMounted(async () => {
  try {
    const metadata = await model.getMetadata()
    const entitySetsList = metadata.getEntitySetsList()

    entitySets.value = entitySetsList.map(name => ({
      value: name.split('.').pop()!,
      label: name.split('.').pop()!.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()
    }))
  } catch (error) {
    console.error('Failed to load entity sets:', error)
  } finally {
    loading.value = false
  }
})

const handleStart = () => {
  if (!canProceed.value) return

  router.push({
    name: selectedUiType.value,
    params: { entitySet: selectedEntitySet.value },
  })
}
</script>

<template>
  <section class="welcome-section">
    <div class="theme-toggle">
      <button
        class="theme-toggle__button"
        @click="isDark = !isDark"
      >
        <IconLightDarkLoop />
      </button>
    </div>

    <div class="welcome-container">
      <!-- Configuration Card -->
      <div :no-padding="true" class="welcome-card layer-2">
        <div class="welcome-card__header" :style="headerGradient">
          <NotSapLogo />
        </div>

        <div class="welcome-card__content">
          <h5 class="uppercase">Collection</h5>
          <AppSelect
            v-model="selectedEntitySet"
            :loading
            :items="entitySets"
          />

          <h5 class="ui-type-header uppercase">UI Type</h5>
          <div class="ui-type-selector">
            <button
              v-for="uiType in uiTypes"
              :key="uiType.value"
              @click="selectedUiType = uiType.value"
              class="ui-type-button"
              :class="{ 'ui-type-button--selected': selectedUiType === uiType.value }"
            >
              <component :is="uiType.icon" class="ui-type-button__icon" />
              <div class="ui-type-button__content">
                <span class="ui-type-button__label">{{ uiType.label }}</span>
              </div>
            </button>
          </div>

          <AppButton
            class="start-button"
            @click="handleStart"
            :disabled="!canProceed"
          >
            Start Exploring
          </AppButton>
        </div>
      </div>

      <p class="welcome-footer">
        A demonstration of
        <a href="https://github.com/mav-rik/not-sap/tree/main/packages/ui" class="welcome-link">notsapui</a>
        and
        <a href="https://github.com/mav-rik/not-sap/tree/main/packages/odata" class="welcome-link">notsapodata</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: rgb(var(--current-bg));
  transition: background-color 0.3s ease;
  padding: 0 2em;
}

.theme-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.theme-toggle__button {
  background-color: transparent;
  color: var(--text-secondary, #6b7280);
  border-radius: 50%;
  padding: 0rem;
  width: 2.5rem;
  height: 2.5rem;
}

.welcome-container {
  max-width: 600px;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.welcome-card {
  width: 100%;
  overflow: hidden;
  border-radius: 2em;
  box-shadow: 2px 4px 12px 1px #00000025;
}

.welcome-card__header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  padding: 2rem 0;
  border: none;
}

.welcome-card__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
}

.ui-type-header {
  margin-top: 0.5rem;
}

.uppercase {
  text-transform: uppercase;
  margin-top: 1em;
}

.ui-type-selector {
  display: flex;
  gap: 1rem;
}

.ui-type-button {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  gap: 1rem;
  padding: 1.5rem;
  border: 2px solid transparent;
  border-radius: 1em;
  color: var(--scope-dark-0, #1f2937);
  cursor: pointer;
  transition: all 0.2s ease;
}

.ui-type-button:hover {
  background-color: #88888820;
}

.ui-type-button:focus {
  outline: none;
  border-color: var(--primary-color, #0070f2);
}

.ui-type-button--selected {
  border-color: var(--primary-color, #0070f2);
  background-color: var(--primary-bg, rgba(0, 112, 242, 0.1));
}

.ui-type-button__icon {
  font-size: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui-type-button__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.ui-type-button__label {
  font-weight: 500;
}

.start-button {
  width: 100%;
  margin-top: 0.5rem;
  height: 3em;
  font-size: 16px;
  background-color: var(--primary);
}

.welcome-footer {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
  text-align: center;
  margin: 0.5rem 0;
}

.welcome-link {
  color: var(--primary-color, #0070f2);
  text-decoration: none;
}

.welcome-link:hover {
  text-decoration: underline;
}

@media (prefers-color-scheme: dark) {
  .welcome-section {
    --bg-color: #111827;
  }

  .theme-toggle__button {
    --text-secondary: #9ca3af;
  }

  .ui-type-button {
    color: var(--scope-light-0, #1f2937);
  }

  .welcome-footer {
    --text-secondary: #9ca3af;
  }
}
</style>