To Run this App Try below steps :

step 1 : put .env file in root folder of the project

step 2 : npm i

# for running app in ios then this step is required

step 3 : cd ios && pod install

# to run app in android emulator

step 4 : npx react-native run-android

# to run app in ios simulator

step 5 : npx react-native run-ios

############################################################################

## list of libraries used in this app

# for storing encrypted date i have used

@react-native-async-storage/async-storage"

# for manage navigation in app

"@react-navigation/native"
"@react-navigation/native-stack"

# for the date conversion

"moment"

# to getting secret key from the env file

"react-native-config":

# for displaying and adding credit card i have used

"react-native-credit-card"

# for managing encryption and decryption

"react-native-crypto-js"

# to store sensitive data like email and password

"react-native-keychain"

# used for expiry month and year

"react-native-month-year-picker"
