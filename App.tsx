/* eslint-disable camelcase */
import React from "react";
import FlashMessage from "react-native-flash-message";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import * as NavigationBar from "expo-navigation-bar";

import { PlantData } from "./src/libs/storage";
import Routes from "./src/routes";
import { Theme } from "./src/theme";
import { StatusBar } from "expo-status-bar";

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

SplashScreen.preventAutoHideAsync();
NavigationBar.setBackgroundColorAsync("#fff");

export default function App(): React.ReactElement | null {
  const [fontsLoaded] = useFonts({
    Jost_600SemiBold,
    Jost_400Regular,
  });

  React.useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    /*
    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const content = notification.request.content
        console.log(content)
      }
    );
      
    return () => subscription.remove();
    */
  }, []);

  React.useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Theme>
      <FlashMessage position="top" statusBarHeight={getStatusBarHeight()} />
      <StatusBar style="dark" translucent />
      <Routes />
    </Theme>
  );
}
