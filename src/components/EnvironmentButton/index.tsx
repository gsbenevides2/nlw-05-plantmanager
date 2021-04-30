import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import * as Styled from './styles'

interface EnvironmentButtonProps extends RectButtonProps {
  title: string
  active?: boolean
}

export function EnvironmentButton({
  title,
  active = false,
  ...rest
}: EnvironmentButtonProps): React.ReactElement {
  return (
    <Styled.Container active={active} {...rest}>
      <Styled.Text active={active}>{title}</Styled.Text>
    </Styled.Container>
  )
}
