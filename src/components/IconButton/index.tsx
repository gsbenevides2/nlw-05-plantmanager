import React from 'react'

import * as Styled from './styles'

interface Props {
  icon: string
  onPress: () => void
}

export function IconButton(props: Props): React.ReactElement {
  return (
    <Styled.Touchable onPress={props.onPress} activeOpacity={0.7}>
      <Styled.Icon name={props.icon} />
    </Styled.Touchable>
  )
}
