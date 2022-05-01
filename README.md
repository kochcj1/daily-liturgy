# Daily Liturgy

This React Native-based app was created free of charge for [The Daily Liturgy Podcast](https://dailyliturgy.com/).

In addition to providing a way to listen to and/or read along with the current day's podcast, the app also integrates with Stripe and Apple Pay to provide a way to donate to The Daily Liturgy Podcast.

Unfortunately, as the app neared completion, those responsible for managing The Daily Liturgy Podcast did not feel that they had the time to manage the app once it was released. As a result, this app has not yet been published to the App Store.

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
