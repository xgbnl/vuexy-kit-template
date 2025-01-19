// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@utils/getDictionary'

const horizontalMenuData = (dictionary: Awaited<ReturnType<typeof getDictionary>>): HorizontalMenuDataType[] => [
  {
    label: dictionary['navigation'].crm,
    href: '/crm',
    icon: 'tabler-smart-home'
  },
  {
    label: dictionary['navigation'].home,
    href: '/home',
    icon: 'tabler-smart-home'
  },
  {
    label: dictionary['navigation'].about,
    href: '/about',
    icon: 'tabler-info-circle'
  },
  {
    label: dictionary['navigation'].test,
    href: '/test',
    icon: 'tabler-info-circle'
  },
]

export default horizontalMenuData
