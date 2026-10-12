# BasketWise mobile preview

This folder contains the Expo / React Native app for iOS and Android. It mirrors the web prototype's compare, basket, coupon, price watch, and local insights flows.

## Run it

Install the current Node.js LTS version, then from this folder run:

```sh
npm install
npx expo start
```

Scan the development QR code with Expo Go on a phone, or open the app in an installed iOS Simulator or Android Emulator. Install Xcode on macOS for the iOS Simulator and Android Studio for the Android Emulator. SDK 57 requires Node.js 22.13 or newer; Node.js 24 LTS is recommended.

For a physical iPhone, sign in to the Expo account in both Expo CLI and Expo Go. Use a development build later when the app needs native modules beyond those included in Expo Go.

## Prototype boundaries

- Prices, offers, price-watch charts, and geographic insights are illustrative sample data.
- Basket and watch-list state is held in memory for this mobile preview; it resets when the app process restarts.
- No retailer API, product inventory, coupon checkout, account, receipt scanning, push alert, route, or backend integration is connected yet.
- `com.basketwise.grocery` is a provisional bundle/package identifier and must be confirmed before store submission.
