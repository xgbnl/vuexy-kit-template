export type DatePoint = {
  year: number
  month: string
  day: string
  hours: string
  minutes: string
  seconds: string
}

export type DateTimeInterface = (date: string | number | Date | null) => string

/**
 * Format date to yyyy-MM-dd
 * @param date
 * @returns yyyy-MM-dd
 */
export const serializeDate: DateTimeInterface = (date: string | number | Date | null): string => {
  if (null === date) {
    return ''
  }

  const isTimestamp = typeof date === 'number' || typeof date === 'string'

  const { year, month, day } = format(isTimestamp ? new Date(date) : date)

  return `${year}-${month}-${day}`
}

/**
 * Format date to yyyy-MM-dd HH:mm:ss
 * @param date
 * @returns yyyy-MM-dd HH:mm:ss
 */
export const serializeDatetime = (date: string | number | Date | null): string => {
  if (null === date) {
    return ''
  }

  const isTimestamp = typeof date === 'number' || typeof date === 'string'

  const { year, month, day, hours, minutes, seconds } = format(isTimestamp ? new Date(date) : date)

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function format(date: Date): DatePoint {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds
  }
}

export function serializeTime(date: Date | null): string {
  if (null === date) {
    return ''
  }

  let hours = date.getHours()
  const minutes = date.getMinutes()

  const ampm = hours >= 12 ? '下午' : '上午'

  hours = hours % 12
  hours = hours || 12

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  return `${hours}:${formattedMinutes} ${ampm}`
}
