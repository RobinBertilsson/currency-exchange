import { HasClassName } from '~/models/HasClassName'
import { PropsWithChildren } from 'react'
import classNames from 'classnames'

export function Panel({ children, className }: PropsWithChildren<HasClassName>) {
  return <div className={classNames('bg-white p-4 rounded-sm border border-gray-200', className)}>{children}</div>
}
