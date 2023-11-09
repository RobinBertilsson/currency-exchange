/**
 * Get all the configured currencies.
 */
export function getCurrencies(): string[] {
  return (process.env.NEXT_PUBLIC_APP_CURRENCIES?.split(',') ?? []) as string[]
}
