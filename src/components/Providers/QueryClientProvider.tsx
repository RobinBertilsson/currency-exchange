import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from 'react-query'
import { PropsWithChildren } from 'react'

const queryClient = new QueryClient()

/**
 * Wrapper component for React Query
 *
 * See https://tanstack.com/query/v3/docs/react/quick-start
 */
export function QueryClientProvider({ children }: PropsWithChildren) {
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}
