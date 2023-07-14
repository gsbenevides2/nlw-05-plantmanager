import React from 'react'
import { Animated, View } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { SvgFromUri } from 'react-native-svg'

import { Feather } from '@expo/vector-icons'

import { theme } from '../../theme'
import * as Styled from './styles'

interface PlantProps extends RectButtonProps {
  data: {
    name: string
    photo: string
    hour: number,
    minute: number
  }
  handleRemove: () => void
}

export function PlantCardSecondary({
  data,
  handleRemove,
  ...rest
}: PlantProps): React.ReactElement {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <Styled.ButtonRemove onPress={handleRemove}>
              <Feather name="trash" size={32} color={theme.colors.white} />
            </Styled.ButtonRemove>
          </View>
        </Animated.View>
      )}
    >
      <Styled.Container {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Styled.Title>{data.name}</Styled.Title>
        <Styled.Details>
          <Styled.TimeLabel>Regar às</Styled.TimeLabel>
          <Styled.Time>{data.hour}:{data.minute}</Styled.Time>
        </Styled.Details>
      </Styled.Container>
    </Swipeable>
  )
}
