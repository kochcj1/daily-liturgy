import React, { useState } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import WebScreen from './WebScreen';

const Stack = createStackNavigator();

export default function LiturgyNavigator() {
  const [menuVisible, setMenuVisible] = useState(false);
  const openWebsite = (navigation) => {
    setMenuVisible(false);
    navigation.navigate("Web", {
			title: "The Daily Liturgy Podcast",
			url: "https://dailyliturgy.com/"
		});
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#8f6b50" },
          headerTintColor: "white"
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Friday, January 28, 2022",
            headerRight: () => (
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <IconButton
                    icon={require("../assets/icons8-menu-vertical-90.png")}
                    color="white"
                    onPress={() => setMenuVisible(true)}
                  />
                }
              >
                <Menu.Item onPress={() => openWebsite(navigation)} title="About The Daily Liturgy Podcast" />
              </Menu>
            )
          })}
        />
        <Stack.Screen
          name="Web"
          component={WebScreen}
          options={(props) => {
            return {
              title: props.route.params.title
          }}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}