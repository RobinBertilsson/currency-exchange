import { AuthenticatedRequest } from '../shared/AuthenticatedRequest'
import { BaseUrl } from '../shared/BaseUrl'

interface GetHistoricalRequest extends AuthenticatedRequest {
  date: string
  base: string
  symbols: string[]
}

interface GetHistoricalResponse {
  rates: Record<string, number>
  timestamp: number
  base: string
}

export async function getHistorical(request: GetHistoricalRequest): Promise<GetHistoricalResponse> {
  const { appId, date, base, symbols } = request

  const response = await fetch(`${BaseUrl}/historical/${date}.json?app_id=${appId}&base=${base}&symbols=${symbols}`)

  return await response.json()
}
