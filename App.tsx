/* eslint-disable camelcase */
import React from 'react'
import FlashMessage from 'react-native-flash-message'

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications'

import { PlantProps } from './src/libs/storage'
import Routes from './src/routes'
import { Theme } from './src/theme'

export default function App(): React.ReactElement {
  const [fontsLoaded] = useFonts({
    Jost_600SemiBold,
    Jost_400Regular
  })

  React.useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
      })
    })

    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps
        console.log(data)
      }
    )

    return () => subscription.remove()
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <Theme>
      <Routes />
      <FlashMessage position="top" />
    </Theme>
  )
}
