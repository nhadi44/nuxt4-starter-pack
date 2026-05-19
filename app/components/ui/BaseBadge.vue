<script setup lang="ts">
  import { cva, type VariantProps } from 'class-variance-authority'
  import { cn } from '~/utils/cn'

  const badgeVariants = cva(
    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
      variants: {
        variant: {
          default:
            'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/85',
          secondary:
            'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
          destructive:
            'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
          outline: 'text-foreground border-border',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  )

  interface Props {
    variant?: VariantProps<typeof badgeVariants>['variant']
  }

  withDefaults(defineProps<Props>(), {
    variant: 'default',
  })
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), $attrs.class as string)">
    <slot />
  </div>
</template>
