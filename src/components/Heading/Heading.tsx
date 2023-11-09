import classNames from 'classnames'
import { PropsWithChildren, useMemo } from 'react'

interface Props extends PropsWithChildren {
  withBorder?: boolean
  level: 'h1' | 'h2'
}

export function Heading({ children, level, withBorder = false }: Props) {
  const levelClassNames = useMemo(() => {
    switch (level) {
      case 'h1':
        return 'text-2xl'
      case 'h2':
        return 'text-xl'
    }
  }, [level])

  const borderClassNames = useMemo(() => {
    return withBorder ? 'border-b border-gray-300 pb-2' : null
  }, [withBorder])

  return <h1 className={classNames('font-semibold mb-4', levelClassNames, borderClassNames)}>{children}</h1>
}
