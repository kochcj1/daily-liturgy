import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>All rights to the content used in this app belong to The Daily Liturgy Podcast and Coram Deo Church of Omaha, Nebraska.</Text>
      <View style={styles.spacer} />
      <Text style={styles.text}>Icons used courtesy of https://icons8.com.</Text>
      <View style={styles.spacer} />
      <Text style={styles.text}>This app is powered by React Native.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    margin: 25
  },
  text: {
    fontSize: 16,
  },
  spacer: {
    height: 25
  }
});
