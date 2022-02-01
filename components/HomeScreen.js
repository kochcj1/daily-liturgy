import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, ViewBase } from 'react-native';
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

export default function HomeScreen({ navigation, audio }) {
	const [audioStreaming, setAudioStreamingHelper] = useState(false);
	const setAudioStreaming = (stream) => {
		setAudioStreamingHelper(stream);
		if (stream) {
			audio.setStatusAsync({ shouldPlay: true });
		}
		else {
			audio.pauseAsync();
		}
	};
	const shiftAudio = async (milliseconds) => {
		const status = await audio.getStatusAsync();
		await audio.setPositionAsync(status.positionMillis + milliseconds);
	};

	const [audioProgress, setAudioProgress] = useState("0:00 / 0:00");
	useEffect(() => {
		audio.setOnPlaybackStatusUpdate((status) => {
			setAudioProgress(`${millisToMinutesAndSeconds(status.positionMillis)} / ${millisToMinutesAndSeconds(status.playableDurationMillis)}`);
		});
	}, []);

	const openScripture = (passage, url) => {
		navigation.navigate("Web", {
			title: passage,
			url: url
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
							<Paragraph>O Lord, you have said, “Seek my face.” My heart says to you, “Your face, Lord, do I seek.” Do not hide your face from me. Do not turn me away in anger.Teach me your ways, O Lord, that I may walk in your truth; unite my heart to fear your name.</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title titleNumberOfLines={2} title="Confession of Sin and Prayer for Grace" left={PrayerAvatar} />
						<Card.Content>
							<Paragraph>Lord Jesus Christ, Son of God, have mercy on me, a sinner. For although you have forgiven my sin, I have not forgiven those who sin against me. Inwardly, I harbor bitterness, resentment, and anger. Lift my eyes to your cross, Lord Jesus, that in remembrance of your salvation I would be freed from all resentment. Moreover, purify my thoughts and protect me from biting, sarcastic words. Help me to love and forgive others as you have loved and forgiven me, to the glory of your name. Amen</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="Old Testament Reading" subtitle="Proverbs 23" subtitleStyle={styles.subtitleStyle} left={ReadingAvatar} />
						<Card.Actions style={styles.readingActions}>
							<Button onPress={() => openScripture("Proverbs 23", "https://www.esv.org/Proverbs+23")} color="#8f6b50">Read</Button>
						</Card.Actions>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="The Lord's Prayer" left={PrayerAvatar} />
						<Card.Content>
							<Paragraph>Our Father, who art in heaven, hallowed be thy Name. Thy kingdom come. Thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil. For thine is the kingdom and the power, and the glory, forever. Amen.</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="New Testament Reading" subtitle="Luke 4:21-30" subtitleStyle={styles.subtitleStyle} left={ReadingAvatar} />
						<Card.Actions style={styles.readingActions}>
							<Button onPress={() => openScripture("Luke 4:21-30", "https://www.esv.org/Luke+4:21-30")} color="#8f6b50">Read</Button>
						</Card.Actions>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="Prayer of Adoration" left={PrayerAvatar} />
						<Card.Content>
							<Paragraph>Lord Jesus, I adore you as the Savior of all. You came to redeem everyone under the curse, to cleanse all who are stained by sin, to free all those who are in bondage. Thank you that your mercy is freely offered to all people, tribes, tongues, and nations.</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="Psalm Reading" subtitle="Psalm 111" subtitleStyle={styles.subtitleStyle} left={ReadingAvatar} />
						<Card.Actions style={styles.readingActions}>
							<Button onPress={() => openScripture("Psalm 111", "https://www.esv.org/Psalm+111")} color="#8f6b50">Read</Button>
						</Card.Actions>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="Prayer of Consecration" left={PrayerAvatar} />
						<Card.Content>
							<Paragraph>O Lord, with the psalmist and the congregation of your people through all time, I offer thanks to you with my whole heart. Your word confronts my individualism and my tendency toward self-focus. Help me remember that I’m part of the great company of God’s people, stretching back through time. Lift my eyes above myself, and remind me of your generational faithfulness to your people. As I go about the work of this day, help me return again to your grace, your mercy, and your generous provision. As I interact with the people and situations you’ve ordained, help me cultivate a restful heart, because I’m grounded in your covenant love. Give me the fear of the Lord, that I might grow in the wisdom this psalm describes. And give me an expansive vision for the community of believers to which I belong.</Paragraph>
						</Card.Content>
					</Card>
					<View style={styles.verticalSpacer} />
					<Card>
						<Card.Title title="Benediction" left={BenedictionAvatar} />
						<Card.Content>
							<Paragraph>And now may the grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit, be with us now and always, until the day of Christ's return.</Paragraph>
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
