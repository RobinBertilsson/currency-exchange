import { Currency } from '~/sdk/shared/Currency'

export function getCurrencies(): Currency[] {
  return (process.env.APP_CURRENCIES?.split(',') ?? []) as Currency[]
}
