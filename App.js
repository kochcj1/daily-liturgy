import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import LiturgyNavigator from './components/LiturgyNavigator';
import { Audio } from 'expo-av';
import * as cheerio from 'cheerio';

// TODO:
// - icons8 licensing
// - use useFocusEffect or something to re-show the Home screen's audio controls which may have been hidden by the About screen
// - Handle play button state when we reach the end of audio or when exiting the app
// - Handle lack of internet connectivity and/or lack of being able to parse out the information we need
// - Handle other screen sizes and types (e.g. tablets, without fancy status bar, screen rotation, etc.)
// - Publish the app (with app icon)

// Log:
// - Jan 28, 2022: 2.5 hours
// - Jan 29, 2022: 3 hours
// - Jan 30, 2022: 1 hour
// - Jan 31, 2022: 3.5 hours
// - Feb 01, 2022: 3 hours

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

async function loadAsync() {
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
  return { ...liturgy, audio }
};

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [liturgy, setLiturgy] = useState(null);

  if (appLoaded) {   
    return (
      <PaperProvider>
        <LiturgyNavigator liturgy={liturgy} />
      </PaperProvider>
    );
  }
  
  return (
    <AppLoading 
      startAsync={async () => {
        setLiturgy(await loadAsync());
      }}
      onFinish={() => setAppLoaded(true)}
      onError={(error) => alert(error)}
    />
  );
}
