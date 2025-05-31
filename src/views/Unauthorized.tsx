'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'

// Configs Imports
import { type Locale, i18n } from '@/configs/i18n'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Styled Components
const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const Unauthorized = ({ mode, lang }: { mode: SystemMode; lang: Locale }) => {
  // Vars
  const darkImg = '/images/pages/misc-mask-dark.png'
  const lightImg = '/images/pages/misc-mask-light.png'

  // Hooks
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const miscBackground = useImageVariant(mode, lightImg, darkImg)

  return (
    <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
      <div className='flex items-center flex-col text-center'>
        <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset] mbe-6'>
          <Typography className='font-medium text-8xl' color='text.primary'>
            403
          </Typography>
          <Typography variant='h4'>{lang === i18n.defaultLocale ? '您无权访问此页面' : 'Page Forbidden'} ⚠️</Typography>
          <Typography>
            {lang === i18n.defaultLocale
              ? '您的访问被拒绝，您无权查看此内容'
              : 'Your access has been denied. You do not have permission to view this content.'}
          </Typography>
        </div>
        <Button href='/' component={Link} variant='contained'>
          {lang === i18n.defaultLocale ? '回到首页' : 'Back To Home'}
        </Button>
        <img
          alt='error-404-illustration'
          src='/images/illustrations/characters/3.png'
          className='object-cover bs-[400px] md:bs-[450px] lg:bs-[500px] mbs-10 md:mbs-14 lg:mbs-20'
        />
      </div>
      {!hidden && (
        <MaskImg
          alt='mask'
          src={miscBackground}
          className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
        />
      )}
    </div>
  )
}

export default Unauthorized
