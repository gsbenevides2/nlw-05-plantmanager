import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'

import wateringImg from '../../assets/watering.png'
import { IconButton } from '../../components/IconButton'
import * as Styled from './styles'

interface Props {
  navigation: ReturnType<typeof useNavigation>
}

export function WelcomeScreen({ navigation }: Props): React.ReactElement {
  const [loading, setLoading] = React.useState(true)
  function goToUserIdentification() {
    navigation.navigate('UserIdentification')
  }
  React.useEffect(() => {
    async function handleWelcomeScreen() {
      const user = await AsyncStorage.getItem('@plantmanager:user')
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }]
        })
      } else {
        setLoading(false)
      }
    }
    handleWelcomeScreen()
  }, [])

  if (loading) return <AppLoading />
  else
    return (
      <Styled.SafeArea>
        <Styled.Wrapper>
          <Styled.Header>
            Gerencie {'\n'}
            suas plantas de {'\n'}
            forma fácil
          </Styled.Header>
          <Styled.Img source={wateringImg} resizeMode="contain" />
          <Styled.Description>
            Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
            sempre que precisar.
          </Styled.Description>
          <IconButton onPress={goToUserIdentification} icon="chevron-right" />
        </Styled.Wrapper>
      </Styled.SafeArea>
    )
}
