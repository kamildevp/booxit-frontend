import type { ButtonVariants } from '~/components/ui/button'
import { cva } from 'class-variance-authority'

export type Variants = 'default' | 'xl'

export const iconVariants = cva(
  '',
  {
    variants: {
      size: {
        default: 'text-2xl',
        xl: 'text-3xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export const clearIconVariants = cva(
  '',
  {
    variants: {
      size: {
        default: 'text-xl',
        xl: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export const resultsListVariants = cva(
  'flex flex-col gap-1 absolute z-5 rounded-xl bg-popover border dark:border-none w-full overflow-auto max-h-70',
  {
    variants: {
      size: {
        default: 'top-11',
        xl: 'top-13 md:top-14',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export const clearButtonSizes: Record<Variants, ButtonVariants['size']> = {
  default: 'icon-sm',
  xl: 'icon',
}
