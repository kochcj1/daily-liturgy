import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Card, Paragraph, Button } from 'react-native-paper';

const BaseAvatar = props => <Avatar.Icon {...props} backgroundColor="#8f6b50" />
const PrayerAvatar = props => <BaseAvatar {...props} icon={require('../assets/icons8-pray-64.png')} />
const ReadingAvatar = props => <BaseAvatar {...props} icon={require('../assets/icons8-holy-bible-60.png')} />
const BenedictionAvatar = props => <BaseAvatar {...props} icon={require('../assets/icons8-gift-96.png')} />

export default function HomeScreen({ navigation, liturgy, onFocus=null }) {
	const openScripture = (passage) => {
		navigation.navigate("Web", {
			title: passage,
			url: `https://www.esv.org/${passage.replace(" ", "+")}`
		});
	};

	useFocusEffect(() => {
		if (onFocus) {
			onFocus();
		}
	});

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
  }
});
