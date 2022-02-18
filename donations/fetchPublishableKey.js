import React from 'react';
import { Alert } from 'react-native';
import { DONATIONS_API_KEY } from '../config';
import BASE_URL from './baseUrl';

// TODO: instead of alerting user with this strange error, just hide payment screen
// TODO: currently in test mode but need to actually activate my account before going
// live (see https://stripe.com/docs/keys)
// TODO: make sure we use SSL for all network requests
export default fetchPublishableKey = async () => {
  try {
    const response = await fetch(`${BASE_URL}/publishable-key`, {
      headers: {
        'Authorization': `Basic ${DONATIONS_API_KEY}`
      }
    });
    const { publishableKey } = await response.json();
    return publishableKey;
  }
  catch (error) {
    Alert.alert('Error', 'Unable to fetch publishable key from server.');
    return null;
  }
};
