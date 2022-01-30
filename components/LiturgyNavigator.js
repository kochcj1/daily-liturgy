import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ScriptureScreen from './ScriptureScreen';

const Stack = createStackNavigator();

export default function LiturgyNavigator() {
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