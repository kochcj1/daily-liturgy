import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AppState } from 'react-native';
import { IconButton, Menu, FAB } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import WebScreen from './WebScreen';
import SupportScreen from './SupportScreen';

// Based on https://stackoverflow.com/a/21294628/3987765:
function millisToMinutesAndSeconds(millis) {
  let minutes = millis / 1000 / 60;
  const remainder = minutes % 1;
  let seconds = Math.floor(remainder * 60);
  if (seconds < 10) {
      seconds = `0${seconds}`;
  }
  minutes = Math.floor(minutes);
  return `${minutes}:${seconds}`;
}

const Stack = createStackNavigator();

export default function LiturgyNavigator({ liturgy }) {
  const [audioControlsVisible, setAudioControlsVisible] = useState(true);
  const [audioStreaming, setAudioStreamingHelper] = useState(false);
	const setAudioStreaming = (stream) => {
		setAudioStreamingHelper(stream);
		if (stream) {
			liturgy.audio.setStatusAsync({ shouldPlay: true });
		}
		else {
			liturgy.audio.pauseAsync();
		}
	};
	const shiftAudio = async (milliseconds) => {
		const status = await liturgy.audio.getStatusAsync();
    let position = status.positionMillis + milliseconds;
    if (position < 0) {
      position = 0;
    }
    else if (position > status.playableDurationMillis) {
      position = status.playableDurationMillis;
    }
		await liturgy.audio.setPositionAsync(position);
	};

  // TODO: audio not working in Expo Go on my physical iPhone... just an Expo Go thing?
  // Specifically not working on Friday, February 18, 2022... what about other dates?
  // http://dailyliturgypodcast.s3.amazonaws.com/EpiphanyDay43_2022(Friday).mp3
	const [audioProgress, setAudioProgress] = useState("0:00 / 0:00");
	useEffect(() => {
		liturgy.audio.setOnPlaybackStatusUpdate((status) => {
			setAudioProgress(`${millisToMinutesAndSeconds(status.positionMillis)} / ${millisToMinutesAndSeconds(status.playableDurationMillis)}`);
      
      // The playback position won't necessarily reach the total duration, but knowing
      // the two strings are equal should get us close enough to knowing that the audio
      // is probably done:
      if (millisToMinutesAndSeconds(status.positionMillis) === millisToMinutesAndSeconds(status.playableDurationMillis)) {
        setAudioStreaming(false);
      }
    });
	}, []);

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  // Pause the audio when the app closes:
  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "background") {
      setAudioStreaming(false);
    }    
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const openWebsite = (navigation) => {
    setMenuVisible(false);
    setAudioStreaming(false);
    setAudioControlsVisible(false);
    navigation.navigate("Web", {
			title: "The Daily Liturgy Podcast",
			url: "https://dailyliturgy.com/"
		});
  };
  const openSupportScreen = (navigation) => {
    setMenuVisible(false);
    setAudioStreaming(false);
    setAudioControlsVisible(false);
    navigation.navigate("Support");
  };

  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerBackTitle: "Back",
            headerStyle: { backgroundColor: "#8f6b50" },
            headerTintColor: "white"
          }}
        >
          <Stack.Screen
            name="Home"
            options={({ navigation }) => ({
              title: liturgy.title,
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
                  <Menu.Item onPress={() => openSupportScreen(navigation)} title="Support The Daily Liturgy Podcast" />
                </Menu>
              )
            })}
          >
            {props => <HomeScreen
              {...props}
              liturgy={liturgy}
              onFocus={() => setAudioControlsVisible(true)}
            />}
          </Stack.Screen>
          <Stack.Screen
            name="Web"
            component={WebScreen}
            options={(props) => {
              return {
                title: props.route.params.title
            }}}
          />
          <Stack.Screen
            name="Support"
            component={SupportScreen}
            options={(props) => {
              return {
                title: "Support the Podcast"
            }}}
          />
        </Stack.Navigator>
        <View
          style={styles.fabContainer}
          visible={audioControlsVisible}
          pointerEvents="box-none"
        >
          <FAB
            small
            style={styles.smallFab}
            icon={require("../assets/icons8-replay-10-100.png")}
            onPress={() => shiftAudio(-10000)}
            visible={audioControlsVisible}
          />
          <FAB
            style={styles.fab}
            label={audioProgress}
            icon={audioStreaming ?
              require("../assets/icons8-pause-90.png") :
              require("../assets/icons8-play-90.png")
            }
            onPress={() => setAudioStreaming(!audioStreaming)}
            visible={audioControlsVisible}
          />
          <FAB
            small
            style={styles.smallFab}
            icon={require("../assets/icons8-forward-10-100.png")}
            onPress={() => shiftAudio(10000)}
            visible={audioControlsVisible}
          />
			  </View>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
	fabContainer: {
		display: "flex",
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "space-between",
		position: "absolute",
    right: 0,
    bottom: 0,
		width: "100%",
		height: 50,
		marginBottom: 25,
    paddingHorizontal: 20
	},
	smallFab: {
		backgroundColor: "#8f6b50",
		marginVertical: 5
	},
	fab: {
		backgroundColor: "#8f6b50"
	}
});
