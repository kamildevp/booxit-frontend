import { cva } from "class-variance-authority"

export { default as Select } from "./Select.vue"
export { default as SelectContent } from "./SelectContent.vue"
export { default as SelectGroup } from "./SelectGroup.vue"
export { default as SelectItem } from "./SelectItem.vue"
export { default as SelectItemText } from "./SelectItemText.vue"
export { default as SelectLabel } from "./SelectLabel.vue"
export { default as SelectScrollDownButton } from "./SelectScrollDownButton.vue"
export { default as SelectScrollUpButton } from "./SelectScrollUpButton.vue"
export { default as SelectSeparator } from "./SelectSeparator.vue"
export { default as SelectTrigger } from "./SelectTrigger.vue"
export { default as SelectValue } from "./SelectValue.vue"

export type SelectVariants = {
  size: 'default' | 'lg'
}

export const selectItemVariants = cva(
  'focus:bg-accent focus:text-accent-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
  {
    variants: {
      size: {
        default: "text-sm",
        lg: "text-base",
      } satisfies Record<SelectVariants['size'], string>,
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export const selectTriggerVariants = cva(
  'border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
  {
    variants: {
      size: {
        default: "text-sm",
        lg: "text-base",
      } satisfies Record<SelectVariants['size'], string>,
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export const selectIconVariants = cva(
  'opacity-50',
  {
    variants: {
      size: {
        default: "size-4 ",
        lg: "size-5",
      } satisfies Record<SelectVariants['size'], string>,
    },
    defaultVariants: {
      size: "default",
    },
  },
)