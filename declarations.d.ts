declare module 'tailwindcss-logical'

type Option = {
  label: string
  value: OptionValue
  disabled?: boolean
}

type OptionValue = string | number
