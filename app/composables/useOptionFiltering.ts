import { computed, type Ref } from 'vue'

export function useOptionFiltering<T>(
  options: Ref<T[]>,
  searchQuery: Ref<string>,
  filterKey: keyof T | ((item: T) => string)
) {
  return computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return options.value

    return options.value.filter((option) => {
      let val = ''
      if (typeof filterKey === 'function') {
        val = filterKey(option)
      } else {
        val = String(option[filterKey] || '')
      }
      return val.toLowerCase().includes(query)
    })
  })
}
