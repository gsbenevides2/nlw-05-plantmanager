import React from 'react'

import * as Styled from './styles'

interface Props {
  text: string
  onPress: () => void
}

export function TextButton(props: Props): React.ReactElement {
  const { text, ...touchableProps } = props
  return (
    <Styled.Touchable {...touchableProps} activeOpacity={0.7}>
      <Styled.TextContent>{text}</Styled.TextContent>
    </Styled.Touchable>
  )
}
