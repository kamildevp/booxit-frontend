import { cva } from 'class-variance-authority'

export type ComboBoxVariants = {
  size: 'default' | 'lg'
}

export const iconVariants = cva(
  '',
  {
    variants: {
      size: {
        default: 'min-w-6 min-h-6',
        lg: 'min-w-7 min-h-7',
      } satisfies Record<ComboBoxVariants['size'], string>,
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
        default: 'min-w-5 min-h-5',
        lg: 'min-w-6 min-h-6',
      } satisfies Record<ComboBoxVariants['size'], string>,
    },
    defaultVariants: {
      size: 'default',
    },
  },
)
