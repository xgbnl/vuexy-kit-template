// React Imports
import type { ReactElement } from 'react'

// MUI Imports

const EmptyState = (): ReactElement => {
  return (
    <div className='flex justify-center items-center flex-col'>
      <div className='flex justify-center'>
        <img src='/images/illustrations/empty/empty-data.svg' alt='Empty' className='w-1/2 h-auto' />
      </div>
      <p>暂无数据</p>
    </div>
  )
}

export default EmptyState
