import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ConfirmationScreen } from '../pages/Confirmation'
import { PlantSaveScreen } from '../pages/PlantSave'
import { UserIdentificationScreen } from '../pages/UserIdentification'
import { WelcomeScreen } from '../pages/Welcome'
import { theme } from '../theme'
import TabRoutes from './tabs.routes'

const StackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: theme.colors.white
      }
    }}
  >
    <StackRoutes.Screen name="Welcome" component={WelcomeScreen} />

    <StackRoutes.Screen
      name="UserIdentification"
      component={UserIdentificationScreen}
    />

    <StackRoutes.Screen name="Confirmation" component={ConfirmationScreen} />

    <StackRoutes.Screen name="App" component={TabRoutes} />

    <StackRoutes.Screen name="PlantSave" component={PlantSaveScreen} />
  </StackRoutes.Navigator>
)

export default AppRoutes
