import { cva } from "class-variance-authority"

export { default as Listbox } from "./Listbox.vue"
export { default as ListboxContent } from "./ListboxContent.vue"
export { default as ListboxItem } from "./ListboxItem.vue"

export type ListboxVariants = {
  size: 'default' | 'lg'
}

export const listboxItemVariants = cva(
  'relative flex w-full items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
  {
    variants: {
      size: {
        default: "text-sm",
        lg: "text-base",
      } satisfies Record<ListboxVariants['size'], string>,
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export const listboxIconVariants = cva(
  '',
  {
    variants: {
      size: {
        default: "size-4 ",
        lg: "size-5",
      } satisfies Record<ListboxVariants['size'], string>,
    },
    defaultVariants: {
      size: "default",
    },
  },
)