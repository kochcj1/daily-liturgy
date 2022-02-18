import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ApplePayButton, useApplePay } from '@stripe/stripe-react-native';
import fetchPaymentIntentClientSecret from '../donations/fetchPaymentIntentClientSecret'

export default function SupportScreen() {
  const {
    presentApplePay,
    confirmApplePayPayment,
    isApplePaySupported
  } = useApplePay();

  const [cart, setCart] = useState([
    { label: "Donation", amount: "1.00", type: "final" },
  ]);

  const pay = async () => {
    const { error, paymentMethod } = await presentApplePay({
      cartItems: cart,
      country: 'US',
      currency: 'USD'
    });

    if (error) {
      Alert.alert(error.code, error.message);
    }
    else {
      console.log(JSON.stringify(paymentMethod, null, 2));
      const clientSecret = await fetchPaymentIntentClientSecret();
      const { error: confirmApplePayError } = await confirmApplePayPayment(
        clientSecret
      );
      if (confirmApplePayError) {
        Alert.alert(confirmApplePayError.code, confirmApplePayError.message);
      }
      else {
        Alert.alert('Success', 'The payment was confirmed successfully!');
      }
    }
  };

  return (
    <View style={styles.container}>
      {isApplePaySupported && (
        <ApplePayButton
          onPress={pay}
          style={styles.payButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  payButton: {
    width: "40%",
    height: 50
  }
});