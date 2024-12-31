// Import react.
import React from 'react'

type Props = {
  children?: React.ReactNode
}

export type JSXElement = <T extends Props>(props: Props = {}) => React.ReactElement;
