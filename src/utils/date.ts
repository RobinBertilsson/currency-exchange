export type DateFormat = 'yyyy-MM-dd'

/**
 * Creates a new UTC date based on the given date params.
 */
export function createUtcDate(year: number, month: number, date: number): Date {
  return new Date(Date.UTC(year, month - 1, date))
}

/**
 * Add given days to any date object.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Returns a range between two given dates.
 */
export function createDateInterval(start: Date, end: Date): Date[] {
  const dates: Date[] = []
  let current = start

  while (current <= end) {
    dates.push(current)
    current = addDays(current, 1)
  }

  return dates
}

/**
 * Formats the given date to the given format.
 */
export function format(date: Date, format: DateFormat = 'yyyy-MM-dd'): string {
  switch (format) {
    case 'yyyy-MM-dd':
      return `${date.getFullYear()}-${date.getUTCMonth() + 1}-${('0' + date.getUTCDate()).slice(-2)}`
    default:
      throw new Error(`The format "${format}" is not yet supported.`)
  }
}
