import { Alert } from 'react-native';
import { DONATIONS_API_KEY } from '../config';
import BASE_URL from './baseUrl';

// TODO: currently in test mode but need to actually activate my Stripe
// account before going live (see https://stripe.com/docs/keys)
// TODO: use SSL for all network requests (i.e. upgrade to paid version of
// Heroku)
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
