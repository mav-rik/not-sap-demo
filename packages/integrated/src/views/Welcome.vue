<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import VuButton from 'vunor/Button.vue'
import VuSelect from 'vunor/Select.vue'
import VuCard from 'vunor/Card.vue'
import VuCardHeader from 'vunor/CardHeader.vue'
import { useDark } from '@vueuse/core'
import { NorthwindModel } from '@/.odata.types'
import NotSapLogo from '@/components/not-sap-logo.vue'
import { selectedEntitySet, selectedUiType } from '@/app-state'

const isDark = useDark()
const router = useRouter()

const model = NorthwindModel.getInstance()

console.log('MODEL SERVICE', model.service)

const entitySets = ref<Array<{ value: string; label: string }>>([])
const loading = ref(true)

const uiTypes = [
  { value: 'minimal', label: 'Minimal Table', icon: 'i--minimal' },
  { value: 'advanced', label: 'Advanced Table', icon: 'i--advanced' },
] as const

const canProceed = computed(() => selectedEntitySet.value && selectedUiType.value)

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
  <section
    class="layer-0 scope-neutral flex min-h-screen flex-col bg-surface-100 dark:bg-surface-900 items-center justify-center"
  >
    <div class="absolute top-$l right-$l">
      <VuButton
        class="c8-flat btn-round btn-square text-grey-800 dark:text-grey-300"
        @click="isDark = !isDark"
        :icon="isDark ? 'i--light-mode' : 'i--dark-mode'"
      />
    </div>

    <div class="max-w-[600px] w-full px-$l flex flex-col items-center gap-$2xl">
      <!-- Logo -->


      <!-- Configuration Card -->
      <VuCard level="h6" rounded class="layer-2 w-full shadow-xl overflow-hidden" no-padding>
        <div class="flex items-center justify-center w-full gap-$l py-$xl border-none"
        :style="`background: linear-gradient(120deg, #0aa7ea -60%, ${isDark ? '#252729' : '#ffffff'} 20%, #0aa7ea25 100%);`"
        >
          <NotSapLogo />
        </div>

        <div class="w-full flex flex-col gap-$m p-$xl">

        <VuCardHeader class="uppercase">Collection</VuCardHeader>
        <VuSelect
          design="filled"
          v-model="selectedEntitySet"
          :loading
          :items="entitySets"
          >
        </VuSelect>
        <VuCardHeader class="mt-$s! uppercase">UI Type</VuCardHeader>
        <div class="flex gap-$m">
          <button
            v-for="uiType in uiTypes"
            :key="uiType.value"
            @click="selectedUiType = uiType.value"
            class="flex justify-center items-center gap-$m"
            :class="[
              'flex-1 layer-2 rounded-$m px-$l py-$l text-body transition-all',
              'hover:layer-3 focus:outline-none focus:ring-2 focus:ring-primary',
              selectedUiType === uiType.value && 'ring-2 ring-primary bg-primary/10'
            ]"
          >
            <div :class="uiType.icon" class="size-32px opacity-60"></div>
            <div class="flex flex-col items-center gap-$s">
              <span class="font-medium">{{ uiType.label }}</span>
            </div>
          </button>
        </div>

        <VuButton
          class="c8-filled w-full"
          @click="handleStart"
          :disabled="!canProceed"
        >
          Start Exploring
        </VuButton>
        </div>
      </VuCard>

      <p class="text-body-s text-grey-600 dark:text-grey-300 text-center my-$s">
        A demonstration of
        <a href="https://github.com/mav-rik/not-sap/tree/main/packages/ui" class="text-primary hover:underline">notsapui</a>
        and
        <a href="https://github.com/mav-rik/not-sap/tree/main/packages/odata" class="text-primary hover:underline">notsapodata</a>
      </p>
    </div>
  </section>
</template>