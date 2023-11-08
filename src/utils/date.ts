export function createUtcDate(year: number, month: number, date: number): Date {
  return new Date(Date.UTC(year, month - 1, date))
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function createDateInterval(start: Date, end: Date): Date[] {
  const dates: Date[] = []
  let current = start

  while (current <= end) {
    dates.push(current)
    current = addDays(current, 1)
  }

  return dates
}

export function format(date: Date): string {
  return `${date.getFullYear()}-${date.getUTCMonth() + 1}-${('0' + date.getUTCDate()).slice(-2)}`
}
