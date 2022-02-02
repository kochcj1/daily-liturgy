import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Card, Paragraph, Button, FAB } from 'react-native-paper';

const BaseAvatar = props => <Avatar.Icon {...props} backgroundColor="#8f6b50" />
const PrayerAvatar = props => <BaseAvatar {...props} icon={require('../assets/icons8-pray-64.png')} />
const ReadingAvatar = props => <BaseAvatar {...props} icon={require('../assets/icons8-holy-bible-60.png')} />
const BenedictionAvatar = props => <BaseAvatar {...props} icon={require('../assets/icons8-gift-96.png')} />

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

export default function HomeScreen({ navigation, liturgy }) {
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

	const openScripture = (passage) => {
		navigation.navigate("Web", {
			title: passage,
			url: `https://www.esv.org/${passage.replace(" ", "+")}`
		});
	};

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<ScrollView style={styles.scrollView}>
				<View style={styles.scrollViewPadding}>
					<Card>
						<Card.Title title="Opening Prayer" left={PrayerAvatar} />
						<Card.Content>
							<Paragraph>{liturgy.openingPrayer}</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title titleNumberOfLines={2} title="Confession of Sin and Prayer for Grace" left={PrayerAvatar} />
						<Card.Content>
							<Paragraph>{liturgy.confessionOfSinAndPrayerForGrace}</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="Old Testament Reading" subtitle={liturgy.oldTestamentReading} subtitleStyle={styles.subtitleStyle} left={ReadingAvatar} />
						<Card.Actions style={styles.readingActions}>
							<Button onPress={() => openScripture(liturgy.oldTestamentReading)} color="#8f6b50">Read</Button>
						</Card.Actions>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="The Lord's Prayer" left={PrayerAvatar} />
						<Card.Content>
							<Paragraph>{liturgy.theLordsPrayer}</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="New Testament Reading" subtitle={liturgy.newTestamentReading} subtitleStyle={styles.subtitleStyle} left={ReadingAvatar} />
						<Card.Actions style={styles.readingActions}>
							<Button onPress={() => openScripture(liturgy.newTestamentReading)} color="#8f6b50">Read</Button>
						</Card.Actions>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="Prayer of Adoration" left={PrayerAvatar} />
						<Card.Content>
							<Paragraph>{liturgy.prayerOfAdoration}</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="Psalm Reading" subtitle={liturgy.psalmReading} subtitleStyle={styles.subtitleStyle} left={ReadingAvatar} />
						<Card.Actions style={styles.readingActions}>
							<Button onPress={() => openScripture(liturgy.psalmReading)} color="#8f6b50">Read</Button>
						</Card.Actions>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="Prayer of Consecration" left={PrayerAvatar} />
						<Card.Content>
							<Paragraph>{liturgy.prayerOfConsecration}</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="Benediction" left={BenedictionAvatar} />
						<Card.Content>
							<Paragraph>{liturgy.benediction}</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
				</View>
			</ScrollView>
			<View style={styles.fabContainer}>
				<FAB
					small
					style={styles.smallFab}
					icon={require("../assets/icons8-replay-10-100.png")}
					onPress={() => shiftAudio(-10000)}
				/>
				<FAB
					style={styles.fab}
					label={audioProgress}
					icon={audioStreaming ?
						require("../assets/icons8-pause-90.png") :
						require("../assets/icons8-play-90.png")
					}
					onPress={() => setAudioStreaming(!audioStreaming)}
				/>
				<FAB
					small
					style={styles.smallFab}
					icon={require("../assets/icons8-forward-10-100.png")}
					onPress={() => shiftAudio(10000)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e2e2',
  },
  scrollView: {
    width: "100%",
  },
  scrollViewPadding: {
    padding: 30,
		paddingBottom: 75
  },
  subtitleStyle: {
    fontSize: 16
  },
  readingActions: {
    display: "flex",
    justifyContent: "center"
  },
  verticalSpacer: {
    height: 20
  },
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
