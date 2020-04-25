import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Store from './src/reduxStore';

import Login from './src/screen/login';
import Home from './src/screen/home';
import Play from './src/screen/play';
import Game from './src/screen/game';
import Friend from './src/screen/friend';
import Official from './src/screen/official';

const TabNavigator  = createBottomTabNavigator(
  {
    LoginScreen: { screen: Login},
    HomeScreen: { screen: Home},
    PlayScreen: { screen: Play},
    GameScreen: { screen: Game},
    FriendScreen: { screen: Friend},
    OfficialScreen: { screen: Official}
  },
  {
    initialRouteName: 'LoginScreen',
    tabBarOptions: {
      style: { display: 'none'}
    }
  }
)

const AppContainer = createAppContainer(TabNavigator);

export default function App() {
  return (
    <Provider store={Store}>
      <AppContainer />
    </Provider>
  );
}
