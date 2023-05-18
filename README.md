# Daily Liturgy

This React Native-based app was created free of charge for [The Daily Liturgy Podcast](https://dailyliturgy.com/).

In addition to providing a way to listen to and/or read along with the current day's podcast, the app also integrates with Stripe and Apple Pay to provide a way to donate to The Daily Liturgy Podcast.

Unfortunately, as the app neared completion, those responsible for managing The Daily Liturgy Podcast did not feel that they had the time to manage the app once it was released. As a result, this app has not yet been published to the App Store.

A SwiftUI-based version of this app can be found [here](https://github.com/kochcj1/daily-liturgy-swiftui).

## Demo

https://user-images.githubusercontent.com/20493743/166129914-e1ef5238-2f1f-42be-8cc0-b1d9c97b8db7.mp4

## Setup

Once the project's dependencies are installed via `npm install`, the app can be run using `expo start`.

However, in order for the app to work properly, first create a file in the project's root directory called `config.js` (this file is being `.gitignore`ed, by the way). This file should contain the API key for accessing the app's donation service. For example:

```
export const DONATIONS_API_KEY = "<API key>";
```

## Stripe and Apple Pay

The backend that's used to support donations via Stripe and Apple Pay can be found [here](https://github.com/kochcj1/daily-liturgy-donations) and is deployed to Heroku [here](https://daily-liturgy-donations.herokuapp.com/). However, note that this link will return an error without a valid API key.

## Notes on Publishing to the App Store

1. Create an Apple Developer account.
1. Follow steps 1-2 provided at [this link](https://levelup.gitconnected.com/react-native-how-to-publish-an-expo-app-to-testflight-debug-common-errors-90e427b4b5ea).
1. When creating a bundle identifier on the Apple Developer website, "com.dailyliturgy" (which is what I had been using for my app previously) wasn't allowed. As a result, I used "com.app.dailyliturgy" instead. Once I updated
the bundle identifier accordingly in app.json, I also had to run `expo run:ios` to update it elsewhere.
1. Use the Apple Developer website to generate an app-specific password.
1. Run `eas login` and enter your Expo account username and password.
1. Create a minimal production profile in eas.json based on the instructions provided [here](https://docs.expo.dev/build/eas-json/#production-builds).
1. Run `eas submit -p ios` and, when prompted, provide it with the link that was generated by `expo build:ios` as well as your app-specific password.
1. The output from the submission will provide you with a link that directs you to a landing page for your app on the App Store Connect website. From there, you can add TestFlight testers for your app.
