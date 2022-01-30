import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import LiturgyNavigator from './components/LiturgyNavigator'

// TODO:
// - icons8 licensing
// - Pull in data from the internet, making sure to handle lack of internet connection
// - Handle other screen sizes and types (e.g. tablets, without fancy status bar, etc.)
// - Publish the app (with app icon)

// Log:
// - Jan 28, 2022: 2.5 hours
// - Jan 29, 2022: 3 hours

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));
};

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  if (appLoaded) {
    return (
      <PaperProvider>
        <LiturgyNavigator />
      </PaperProvider>
    );
  }
  
  return (
    <AppLoading 
      startAsync={wait}
      onFinish={() => setAppLoaded(true)}
      onError={(error) => alert(error)}
    />
  );
}