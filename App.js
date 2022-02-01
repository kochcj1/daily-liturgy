import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import LiturgyNavigator from './components/LiturgyNavigator';
import { Audio } from 'expo-av';

// TODO:
// - icons8 licensing
// - Pull in data from the internet, making sure to handle lack of internet connection
// - Handle other screen sizes and types (e.g. tablets, without fancy status bar, etc.)
// - Publish the app (with app icon)

// Log:
// - Jan 28, 2022: 2.5 hours
// - Jan 29, 2022: 3 hours
// - Jan 30, 2022: 1 hour
// - Jan 31, 2022: 1.5 hours

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

async function loadAsync() {
  const { sound: audio } = await Audio.Sound.createAsync(
    { uri: 'https://dailyliturgypodcast.s3.amazonaws.com/EpiphanyDay23_2022(Friday).mp3' }
  );
  await new Promise(resolve => setTimeout(resolve, 1000));
  return audio;
};

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [audio, setAudio] = useState(null);

  if (appLoaded) {   
    return (
      <PaperProvider>
        <LiturgyNavigator audio={audio} />
      </PaperProvider>
    );
  }
  
  return (
    <AppLoading 
      startAsync={async () => {
        setAudio(await loadAsync());
      }}
      onFinish={() => setAppLoaded(true)}
      onError={(error) => alert(error)}
    />
  );
}