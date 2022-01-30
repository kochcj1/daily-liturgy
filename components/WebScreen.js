import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function LoadingIndicatorView() {
  return <ActivityIndicator style={styles.loadingIndicator} color="#8f6b50" size="large" />
}

export default function WebScreen(props) {
  return (
    <WebView
      source={{ uri: props.route.params.url }}
      renderLoading={LoadingIndicatorView}
      startInLoadingState={true}
    />
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  }
});