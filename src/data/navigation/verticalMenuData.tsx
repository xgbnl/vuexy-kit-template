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
    label: dictionary['navigation'].example,
    href: `/${dictionary['locale']}/example`,
    icon: 'tabler-info-circle',
    children: [
      {
        label: dictionary['navigation'].empty,
        href: `/${dictionary['locale']}/example/empty`
      }
    ]
  }
]

export default verticalMenuData
