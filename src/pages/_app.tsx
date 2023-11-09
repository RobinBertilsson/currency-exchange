import { QueryClientProvider } from '~/components/Providers/QueryClientProvider'
import type { AppProps } from 'next/app'
import '~/styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
