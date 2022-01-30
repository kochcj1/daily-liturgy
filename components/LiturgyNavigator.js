import React, { useState } from 'react';
import { Linking } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ScriptureScreen from './ScriptureScreen';

const Stack = createStackNavigator();

export default function LiturgyNavigator() {
  const [menuVisible, setMenuVisible] = useState(false);
  const openWebsite = () => {
    setMenuVisible(false);
    Linking.openURL("https://dailyliturgy.com/");
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
          options={{
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
                <Menu.Item onPress={openWebsite} title="More About Daily Liturgy" />
              </Menu>
            )
          }}
        />
        <Stack.Screen
          name="Scripture"
          component={ScriptureScreen}
          options={(props) => {
            return {
              title: props.route.params.scripturePassage
          }}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}