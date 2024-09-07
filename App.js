import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PrimaryNavigator from './src/navigation/PrimaryNavigator';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <PrimaryNavigator />
    </NavigationContainer>
  );
};

export default App;
