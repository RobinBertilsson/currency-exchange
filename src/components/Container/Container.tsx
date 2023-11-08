import { HasClassName } from '~/models/HasClassName'
import { PropsWithChildren } from 'react'
import classNames from 'classnames'

export function Container(props: PropsWithChildren<HasClassName>) {
  const { className, children } = props

  return <div className={classNames('container mx-auto max-w-3xl px-4', className)}>{children}</div>
}
