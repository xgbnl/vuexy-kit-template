// MUI Imports
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import type { FormControlProps } from '@mui/material/FormControl'

/**
 *
 * <FormControlStyled className='mb-6' key={configure.name}>
 *     <InputLabel>Name:</InputLabel>
 *       <input name='name'/>
 * </FormControlStyled>
 */
const FormControlStyled = styled(FormControl)<FormControlProps>(({ theme }) => ({
  '& .MuiInputLabel-root': {
    transform: 'none',
    width: 'fit-content',
    maxWidth: '100%',
    lineHeight: 1.153,
    position: 'relative',
    fontSize: theme.typography.body2.fontSize,
    marginBottom: theme.spacing(1),
    color: 'var(--mui-palette-text-primary)',
    '&:not(.Mui-error).MuiFormLabel-colorPrimary.Mui-focused': {
      color: 'var(--mui-palette-primary-main) !important'
    },
    '&.Mui-disabled': {
      color: 'var(--mui-palette-text-disabled)'
    },
    '&.Mui-error': {
      color: 'var(--mui-palette-error-main)'
    }
  }
}))

export default FormControlStyled
