export function makeOption<E>(label: string, value: E, disabled: boolean = false): Option<E> {
  return { label, value, disabled } as Option<E>
}
