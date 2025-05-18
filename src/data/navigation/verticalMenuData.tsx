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
    icon: 'tabler-info-circle',
    children: [
      {
        label: dictionary['navigation'].empty,
        href: `/${dictionary['locale']}/example/empty`
      },
      {
        label: dictionary['navigation'].table,
        href: `/${dictionary['locale']}/example/table`
      },
      {
        label: dictionary['navigation'].picker,
        href: `/${dictionary['locale']}/example/picker`
      },
      {
        label: dictionary['navigation'].autoComplete,
        href: `/${dictionary['locale']}/example/complete`
      },
      {
        label: dictionary['navigation'].enumOption,
        href: `/${dictionary['locale']}/example/enum-option`
      }
    ]
  }
]

export default verticalMenuData
