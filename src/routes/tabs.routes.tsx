import React from "react";
import { Platform } from "react-native";

import  {MaterialIcons}  from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MyPlantsScreen } from "../pages/MyPlants";
import { PlantSelectScreen } from "../pages/PlantSelect";
import { theme } from "../theme";
import { TabsParams } from "./types";

const Tab = createBottomTabNavigator<TabsParams>();

const TabRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green,
        tabBarInactiveTintColor: theme.colors.heading,
        tabBarLabelPosition: "beside-icon",
        headerShown: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Nova Planta"
        component={PlantSelectScreen}
        options={{
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons

              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Minhas Plantas"
        component={MyPlantsScreen}
        options={{
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
