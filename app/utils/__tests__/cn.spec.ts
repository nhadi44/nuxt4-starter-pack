import { describe, it, expect } from 'vitest'
import { cn } from '../cn'

describe('cn utility', () => {
  it('merges tailwind classes cleanly', () => {
    const result = cn('px-2 py-2', 'p-4')
    // 'p-4' should override both 'px-2' and 'py-2'
    expect(result).toContain('p-4')
    expect(result).not.toContain('px-2')
    expect(result).not.toContain('py-2')
  })

  it('handles conditional classes', () => {
    const active = true
    const disabled = false
    const result = cn('base-class', active && 'active-class', disabled && 'disabled-class')
    expect(result).toContain('base-class')
    expect(result).toContain('active-class')
    expect(result).not.toContain('disabled-class')
  })

  it('handles empty and array parameters', () => {
    const result = cn('class1', null, undefined, '', ['class2', 'class3'])
    expect(result).toContain('class1')
    expect(result).toContain('class2')
    expect(result).toContain('class3')
  })
})
