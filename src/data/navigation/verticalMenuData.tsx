// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

const verticalMenuData = (dictionary: Awaited<ReturnType<typeof getDictionary>>): VerticalMenuDataType[] => [
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

export default verticalMenuData
