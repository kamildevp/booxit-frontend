import type { ButtonVariants } from '~/components/ui/button'
import type { ComboBoxVariants } from '../combo-box/variants'

export type SearchBarVariants = {
  size: ComboBoxVariants['size'] & ButtonVariants['size']
}
