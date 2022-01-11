import { ref } from 'vue-demi'
import { tryOnMounted, tryOnScopeDispose } from '@vueuse/shared'

export interface UseInterceptUnloadOptions {
  /**
   *
   * Immediate start tracking onMounted() lifecycle hook
   * @default false
   *
   */
  immediate?: boolean
}

/**
 * reactive useBeforeUnload()
 *
 * @see https://vueuse.org/useBeforeUnload
 *
 * @param callback
 * @param options
 * @returns
 */
export const useBeforeUnload = (callback: Function, options: UseInterceptUnloadOptions) => {
  const {
    immediate = false,
  } = options

  const isTracking = ref(immediate)

  const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    // Cancel the event
    e.preventDefault()
    // Chrome requires returnValue to be set
    e.returnValue = ''

    callback()
  }

  const start = () => {
    if (isTracking.value) return
    window.addEventListener('beforeunload', beforeUnloadHandler, { passive: true })
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    window.removeEventListener('beforeunload', beforeUnloadHandler)
    isTracking.value = false
  }

  tryOnMounted(() => isTracking.value && start())

  tryOnScopeDispose(() => {
    stop()
  })

  return {
    isTracking,
    start,
    stop,
  }
}

export type UseInterceptUnloadReturn = ReturnType<typeof useBeforeUnload>
