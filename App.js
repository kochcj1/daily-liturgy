import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import * as Device from 'expo-device';
import * as Font from 'expo-font';
import LiturgyNavigator from './screens/LiturgyNavigator';
import { Audio } from 'expo-av';
import * as cheerio from 'cheerio';
import DeviceInfoContext from './contexts/DeviceInfoContext';

// TODO:
// - Test on physical devices
// - Test app without internet connectivity
// - Test failure to load/parse data from their website
// - The image used on the splash screen seems distorted on a tablet when in landscape orientation
// - Publish the app

// Wishlist:
// - Use Squarespace's API to fetch data instead of parsing the podcast's website
// - Settings (e.g. font)
// - Scroll to content as audio is being played (using Aeneas Vagrant, for example)
//   - Option to automatically pause after a certain place in the app (and maybe add
//     an actual card there for personal prayer... card can link to the setting in case
//     they want to change that)
// - A way to share a link to the app in the App Store
// - A reminder to rate the app (but not the first time the app is used, only after regular usage)

async function loadAsync() {
  const deviceInfo = { deviceType: await Device.getDeviceTypeAsync() };

  await Font.loadAsync({
    "Roboto-Mono": require('./assets/fonts/Roboto_Mono/static/RobotoMono-Medium.ttf'),
  });

  const response = await fetch("https://dailyliturgy.com/read");
  const htmlData = await response.text();
  const $ = cheerio.load(htmlData);
  const liturgy = {
    title: $("h1.blog-title").first().text().trim(),
    audioUrl: $("div.sqs-audio-embed").attr("data-url"),
    openingPrayer: $("h3:contains('Opening Prayer')").next().children("em").first().text().trim(),
    confessionOfSinAndPrayerForGrace: $("h3:contains('Confession of Sin & Prayer for Grace')").next().children("em").first().text().trim(),
    oldTestamentReading: $("h3:contains('Old Testament Reading')").first().text().trim().split(":").slice(1).join(":").trim(),
    theLordsPrayer: "Our Father, who art in heaven, hallowed be thy Name. Thy kingdom come. Thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil. For thine is the kingdom and the power, and the glory, forever. Amen.",
    newTestamentReading: $("h3:contains('New Testament Reading')").first().text().trim().split(":").slice(1).join(":").trim(),
    prayerOfAdoration: $("h3:contains('Prayer of Adoration')").next().children("em").first().text().trim(),
    psalmReading: $("h3:contains('Psalm Reading')").first().text().trim().split(":").slice(1).join(":").trim(),
    prayerOfConsecration: $("h3:contains('Prayer of Consecration')").next().children("em").first().text().trim(),
    benediction: "And now may the grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit, be with us now and always, until the day of Christ's return." 
  };

  const { sound: audio } = await Audio.Sound.createAsync(
    { uri: liturgy.audioUrl }
  );

  await new Promise(resolve => setTimeout(resolve, 1000));
  return { ...liturgy, audio, deviceInfo }
};

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [liturgy, setLiturgy] = useState(null);

  if (appLoaded) {   
    return (
      <PaperProvider>
        <DeviceInfoContext.Provider value={deviceInfo}>
          <LiturgyNavigator liturgy={liturgy} />
        </DeviceInfoContext.Provider>
      </PaperProvider>
    );
  }
  
  return (
    <AppLoading 
      startAsync={async () => {
        const { deviceInfo, ...liturgy } = await loadAsync();
        setLiturgy(liturgy);
        setDeviceInfo(deviceInfo);
      }}
      onFinish={() => setAppLoaded(true)}
      onError={(error) => alert(error)}
    />
  );
}
