// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

const verticalMenuData = (dictionary: Awaited<ReturnType<typeof getDictionary>>): VerticalMenuDataType[] => [
  {
    label: dictionary['navigation'].dashboard,
    href: `/${dictionary['locale']}/dashboard`,
    icon: 'tabler-smart-home'
  },
  {
    label: dictionary['navigation'].test,
    href: `/${dictionary['locale']}/test`,
    icon: 'tabler-info-circle'
  }
]

export default verticalMenuData
