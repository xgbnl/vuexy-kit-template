// React Imports
import type { ReactElement } from 'react'

// Configs Imports
import { type Locale, i18n } from '@/configs/i18n'

const EmptyState = ({ lang }: { lang?: Locale }): ReactElement => {
  return (
    <span className='flex justify-center items-center flex-col gap-1'>
      <span className='flex justify-center'>
        <img src='/images/illustrations/empty/empty-data.svg' alt='Empty' className='w-1/3 h-auto' />
      </span>
      <p>{lang === undefined || lang === i18n.defaultLocale ? '暂无数据' : 'No data yet'}</p>
    </span>
  )
}

export default EmptyState
