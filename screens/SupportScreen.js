import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Button, DefaultTheme } from 'react-native-paper';
import { Alert, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { initStripe, ApplePayButton, useApplePay } from '@stripe/stripe-react-native';
import fetchPublishableKey from '../donations/fetchPublishableKey';
import fetchPaymentIntentClientSecret from '../donations/fetchPaymentIntentClientSecret';
import CurrencyInput from 'react-native-currency-input';

const donationButtonTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "white"
  }
};

export default function SupportScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [publishableKey, setPublishableKey] = useState(undefined);
  useEffect(() => {
    // TODO: get merchant identifier
    const init = async () => {
      const publishableKey = await fetchPublishableKey();
      if (publishableKey) {
        await initStripe({
          publishableKey,
          merchantIdentifier: "merchant.com.stripe.react.native"
        });
        setPublishableKey(publishableKey);
      }
      setLoading(false);
    };

    init();
  }, []);

  const {
    presentApplePay,
    confirmApplePayPayment,
    isApplePaySupported
  } = useApplePay();

  const customDonationOption = "🤔";
  const donationOptions = ["$1.99", "$4.99", "$14.99", "$24.99", "$49.99", customDonationOption];
  const donationAmountInputRef = useRef(null);
  const [donationAmount, setDonationAmount] = useState(0);
  const [donationAmountText, setDonationAmountText] = useState("0.00");

  const pay = async () => {
    const { error } = await presentApplePay({
      cartItems: [{ label: "Donation", amount: donationAmountText, type: "final" }],
      country: 'US',
      currency: 'USD'
    });

    if (error) {
      if (error.code !== "Canceled") {
        Alert.alert(error.code, error.message);
      }
    }
    else {
      const clientSecret = await fetchPaymentIntentClientSecret(donationAmount);
      const { error: confirmApplePayError } = await confirmApplePayPayment(
        clientSecret
      );
      if (confirmApplePayError) {
        Alert.alert(confirmApplePayError.code, confirmApplePayError.message);
      }
      else {
        navigation.pop();
      }
    }
  };

  const renderDonationOption = ({ item: donationOption }) => (
    <Button
      style={styles.button}
      theme={donationButtonTheme}
      labelStyle={{
        color: "white",
        fontSize: donationOption === customDonationOption ? 20 : 16
      }}
      onPress={() => {
        if (donationOption !== customDonationOption) {
          setDonationAmount(parseFloat(donationOption.substring(1)));
          donationAmountInputRef?.current?.blur();
        }
        else {
          donationAmountInputRef?.current?.clear();
          donationAmountInputRef?.current?.focus();
        }
      }}
    >
      {donationOption}
    </Button>
  );

  return (
    <View style={styles.container}>
      {isLoading &&
        <ActivityIndicator
          style={styles.loadingIndicator}
           color="#8f6b50"
           size="large"
        />
      }
      {!isLoading &&
        publishableKey &&
        isApplePaySupported && (
        <Fragment>
          <FlatList
            style={styles.buttonGrid}
            scrollEnabled={false}
            numColumns={2}
            data={donationOptions}
            renderItem={renderDonationOption}
            keyExtractor={donationOption => donationOption}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center"
            }}
          />
          <View style={styles.divider} />
          <View style={styles.paymentArea}>
            <CurrencyInput
              ref={donationAmountInputRef}
              style={styles.currencyInput}
              textAlign="center"
              placeholder="$0.00"
              keyboardType="decimal-pad"
              value={donationAmount}
              onChangeValue={(value) => {
                if (value < 0) {
                  value = 0;
                }
                else if (value > 1000) {
                  value = 1000;
                }
                setDonationAmount(value);
              }}
              onChangeText={(text) => {
                setDonationAmountText(text.substring(1));
              }}
              prefix="$"
              delimiter=","
              separator="."
              precision={2}
            />
            <ApplePayButton
              onPress={() => {
                const minDonationAmount = 1;
                if (donationAmount < minDonationAmount) {
                  Alert.alert("Invalid amount", "Please enter a value of at least $1.00");
                }
                else {
                  pay();
                }
              }}
              style={styles.payButton}
            />
          </View>
        </Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#e2e2e2"
  },
  loadingIndicator: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  buttonGrid: {
  },
  button: {
    margin: 10,
    width: 120,
    height: 40,
    backgroundColor: "#8f6b50"
  },
  divider: {
    width: "100%",
    borderTopColor: "#999999",
    borderTopWidth: 1,
  },
  paymentArea: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20
  },
  currencyInput: {
    height: 45,
    fontSize: 25,
    marginRight: 20
  },
  payButton: {
    width: 125,
    height: 45
  }
});