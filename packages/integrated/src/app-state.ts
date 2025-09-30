import { ref } from "vue"

export const selectedEntitySet = ref<string>('Orders')
export const selectedUiType = ref<'minimal' | 'advanced'>('minimal')