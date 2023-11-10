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
 * Formats the given date to the given format.
 */
export function format(date: Date, format: DateFormat = 'yyyy-MM-dd'): string {
  switch (format) {
    case 'yyyy-MM-dd':
      return `${date.getFullYear()}-${('0' + (date.getUTCMonth() + 1)).slice(-2)}-${('0' + date.getUTCDate()).slice(
        -2
      )}`
    default:
      throw new Error(`The format "${format}" is not yet supported.`)
  }
}
