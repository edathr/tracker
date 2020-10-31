import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import { Provider } from './src/context/TrackerContext';
import SearchScreen from './src/screens/SearchScreen';
import SignedInScreen from './src/screens/SignedInScreen';
import SignedOutScreen from './src/screens/SignedOutScreen';

const SignedIn = createStackNavigator({
  Main: MainScreen,
  Category: CategoryScreen,
  Search: SearchScreen,
  Profile: SignedInScreen,
}, 
{
  initialRouteName: 'Main', 
  defaultNavigationOptions: {
    title: "Tracker"
  }
} 
);

const SignedOut = createSwitchNavigator({
  SignedOut: SignedOutScreen,
}, 
{
  initialRouteName: 'SignedOut',
})

const navigator = createSwitchNavigator({
  SignedIn: SignedIn,
  SignedOut: SignedOut,
}, 
{
  initialRouteName: 'SignedOut',
} 
);

const App = createAppContainer(navigator);

export default () => {
  return <Provider>
      <App />
  </Provider>;
};