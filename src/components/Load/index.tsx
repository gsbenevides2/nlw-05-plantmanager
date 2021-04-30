import React from 'react'

import loadAnimation from '../../assets/load.json'
import * as Styled from './styles'

export function Load(): React.ReactElement {
  return (
    <Styled.Container>
      <Styled.Animation source={loadAnimation} autoPlay loop />
    </Styled.Container>
  )
}
