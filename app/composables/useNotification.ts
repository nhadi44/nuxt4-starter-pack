import { useToast } from './useToast'

export function useNotification() {
  const { addToast, success, error } = useToast()
  
  return {
    notify: addToast,
    success,
    error,
    info: (title: string, description?: string) => addToast({ title, description, type: 'info' }),
    warning: (title: string, description?: string) => addToast({ title, description, type: 'warning' })
  }
}
