# BasketWise mobile preview

This folder contains the Expo / React Native app for iOS and Android. It mirrors the web prototype's compare, basket, coupon, price watch, and local insights flows.

## Run it

Install [Node.js](https://nodejs.org/en/download/) 24 LTS, then from this folder run:

```sh
npm install
npx expo start
```

For a quick device preview, install Expo Go from the iOS App Store or Google Play and scan the development QR code while your phone and computer are on the same Wi-Fi network. No native toolchain is needed for that path. Install [Xcode](https://developer.apple.com/xcode/) on macOS for the iOS Simulator, and [Android Studio](https://developer.android.com/studio) for the Android Emulator. SDK 57 requires Node.js 22.13 or newer; Node.js 24 LTS is recommended.

Use a development build later when the app needs native modules beyond those included in Expo Go. Expo Application Services (EAS) can create store-ready builds in the cloud after the app has been prepared for release.

## Prototype boundaries

- Prices, offers, price-watch charts, and geographic insights are illustrative sample data.
- Basket and watch-list state is held in memory for this mobile preview; it resets when the app process restarts.
- No retailer API, product inventory, coupon checkout, account, receipt scanning, push alert, route, or backend integration is connected yet.
- `com.basketwise.grocery` is a provisional bundle/package identifier and must be confirmed before store submission.
