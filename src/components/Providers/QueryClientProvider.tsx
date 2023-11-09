import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from 'react-query'
import { PropsWithChildren } from 'react'

const queryClient = new QueryClient()

export function QueryClientProvider({ children }: PropsWithChildren) {
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}
