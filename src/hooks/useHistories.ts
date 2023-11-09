import { useQuery } from 'react-query'

export function useHistories(currency: string) {
  const { isLoading, data } = useQuery<{ histories: { rate: number; date: string }[] }>(['history', currency], () =>
    fetch(`/api/history?currency=${currency}`).then(res => res.json())
  )

  return {
    isLoading,
    data,
  }
}
