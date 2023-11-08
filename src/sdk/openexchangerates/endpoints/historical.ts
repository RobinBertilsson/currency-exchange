import { AuthenticatedRequest } from '../shared/AuthenticatedRequest'
import { Currency } from '../../shared/Currency'

interface GetHistoricalRequest extends AuthenticatedRequest {
  date: string
  base: Currency
  symbols: Currency[]
}

interface GetHistoricalResponse {
  timestamp: number
  base: Currency
  rates: Record<Currency, number>
}

const baseUrl = 'https://openexchangerates.org/api'

export async function getHistorical(request: GetHistoricalRequest): Promise<GetHistoricalResponse> {
  const { appId, date, base, symbols } = request

  const response = await fetch(`${baseUrl}/historical/${date}.json?app_id=${appId}&base=${base}&symbols=${symbols}`)

  return await response.json()
}
