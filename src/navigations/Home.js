import React, { useContext, useEffect } from "react";
import { ThemeContext } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChannelList, Profile } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const TabIcon = ({ name, focused }) => {
  const theme = useContext(ThemeContext);
  return (
    <Ionicons
      name={name}
      size={26}
      color={focused ? theme.tabBtnActive : theme.tabBtnInactive}
    />
  );
};

const Tab = createBottomTabNavigator();

const Home = ({navigation, route}) => {
  useEffect(() => {
    const screenName = getFocusedRouteNameFromRoute(route) || 'List';
    navigation.setOptions({
      headerTitle: screenName,
    });
  })
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="List"
        component={ChannelList}
        options={{
          tabBarIcon: ({ focused }) =>
            TabIcon({
              name: focused ? "ios-chatbubbles" : "ios-chatbubbles-outline",
              focused,
            }),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            TabIcon({
              name: focused ? "person-circle" : "person-circle-outline",
              focused,
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
