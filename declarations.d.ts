declare module 'tailwindcss-logical'

type Option<E> = {
  label: string
  value: E[keyof E]
  disabled?: boolean
}
