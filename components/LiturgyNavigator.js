import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu, FAB } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import WebScreen from './WebScreen';

// From https://stackoverflow.com/a/21294619/3987765:
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (
		seconds == 60 ?
		(minutes+1) + ":00" :
		minutes + ":" + (seconds < 10 ? "0" : "") + seconds
	);
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
		await liturgy.audio.setPositionAsync(status.positionMillis + milliseconds);
	};

	const [audioProgress, setAudioProgress] = useState("0:00 / 0:00");
	useEffect(() => {
		liturgy.audio.setOnPlaybackStatusUpdate((status) => {
			setAudioProgress(`${millisToMinutesAndSeconds(status.positionMillis)} / ${millisToMinutesAndSeconds(status.playableDurationMillis)}`);
		});
	}, []);

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
                </Menu>
              )
            })}
          >
            {props => <HomeScreen {...props} liturgy={liturgy} />}
          </Stack.Screen>
          <Stack.Screen
            name="Web"
            component={WebScreen}
            options={(props) => {
              return {
                title: props.route.params.title
            }}}
          />
        </Stack.Navigator>
        <View style={styles.fabContainer} visible={audioControlsVisible}>
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
		justifyContent: "space-around",
		position: "absolute",
    right: 0,
    bottom: 0,
		width: "100%",
		height: 50,
		marginBottom: 30
	},
	smallFab: {
		backgroundColor: "#8f6b50",
		marginVertical: 5
	},
	fab: {
		backgroundColor: "#8f6b50"
	}
});
