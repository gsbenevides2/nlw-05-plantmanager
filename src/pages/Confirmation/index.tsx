import React from 'react'

import { StackActions } from '@react-navigation/native'

import { TextButton } from '../../components/TextButton'
import * as Styled from './styles'


import {StackScreenProps} from '@react-navigation/stack'
import { StackScreensProps } from '../../routes/types'

interface Params {
  title: string
  subtitle: string
  buttonTitle: string
  icon: 'smile' | 'hug'
  nextScreen: 'goToApp' | 'goBack'
}

const emojis = {
  hug: '🤗',
  smile: '😄'
}



type Props = StackScreenProps<StackScreensProps, "Confirmation">

export function ConfirmationScreen({
  navigation,
  route
}: Props): React.ReactElement {
  const { params } = route

  function handleButtonOnPress() {
    if (params.nextScreen === 'goToApp')
      navigation.reset({
        index: 0,
        routes: [{ name: 'App' }]
      })
    else navigation.dispatch(StackActions.popToTop())
  }

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Emoji>{emojis[params.icon]}</Styled.Emoji>

        <Styled.Title>{params.title}</Styled.Title>

        <Styled.Subtitle>{params.subtitle}</Styled.Subtitle>

        <Styled.Footer>
          <TextButton text={params.buttonTitle} onPress={handleButtonOnPress} />
        </Styled.Footer>
      </Styled.Content>
    </Styled.Container>
  )
}
