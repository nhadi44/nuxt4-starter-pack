import { ref } from 'vue'

export function useLoading(initialState = false) {
  const isLoading = ref(initialState)
  
  function start() {
    isLoading.value = true
  }
  
  function stop() {
    isLoading.value = false
  }
  
  async function wrap<T>(promise: Promise<T>): Promise<T> {
    start()
    try {
      return await promise
    } finally {
      stop()
    }
  }
  
  return {
    isLoading,
    start,
    stop,
    wrap
  }
}
