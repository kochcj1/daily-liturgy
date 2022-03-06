import { Alert } from 'react-native';
import { DONATIONS_API_KEY } from '../config';
import BASE_URL from './baseUrl';

export default fetchPaymentIntentClientSecret = async (amountDollars) => {
  try {
    const response = await fetch(`${BASE_URL}/payment-intents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${DONATIONS_API_KEY}`
      },
      body: JSON.stringify({
        amount: amountDollars,
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
