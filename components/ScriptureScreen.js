import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function LoadingIndicatorView() {
  return <ActivityIndicator style={styles.loadingIndicator} color="#8f6b50" size="large" />
}

export default function ScriptureScreen(props) {
  return (
    <WebView
      source={{ uri: props.route.params.scriptureURL }}
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