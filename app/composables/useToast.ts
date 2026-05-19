import { ref } from 'vue'

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  title?: string
  description?: string
  type?: ToastType
  duration?: number
}

const toasts = ref<Toast[]>([])

export function useToast() {
  function addToast(toast: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).substring(2, 9)
    toasts.value.push({ ...toast, id })
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }
    return id
  }

  function removeToast(id: string) {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  function success(title: string, description?: string) {
    return addToast({ title, description, type: 'success' })
  }
  
  function error(title: string, description?: string) {
    return addToast({ title, description, type: 'error' })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
  }
}
