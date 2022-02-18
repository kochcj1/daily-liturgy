import React from 'react';
import { Alert } from 'react-native';
import { DONATIONS_API_KEY } from '../config';
import BASE_URL from './baseUrl';

// TODO: don't hardcode API key!!!
// TODO: do better than an obscure alert
export default fetchPaymentIntentClientSecret = async () => {
  try {
    const response = await fetch(`${BASE_URL}/payment-intents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${DONATIONS_API_KEY}`
      },
      body: JSON.stringify({
        amount: 1, // TODO: don't hardcode this dollar value
        currency: 'usd'
      }),
    });
    
    const { clientSecret } = await response.json();
    return clientSecret;
  }
  catch (error) {
    Alert.alert('Error', 'Unable to create payment intent on server.');
    return null;
  }
};
