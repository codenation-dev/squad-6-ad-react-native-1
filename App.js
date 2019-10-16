import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'You are not currently signed in to Expo'
]);

export default function App() {
  return <Routes />
}
