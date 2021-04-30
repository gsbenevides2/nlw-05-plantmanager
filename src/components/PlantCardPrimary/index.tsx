import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'

import * as Styled from './styles'

interface PlantProps extends RectButtonProps {
  data: {
    name: string
    photo: string
  }
}

export function PlantCardPrimary({
  data,
  ...rest
}: PlantProps): React.ReactElement {
  return (
    <Styled.Container {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Styled.Text>{data.name}</Styled.Text>
    </Styled.Container>
  )
}
