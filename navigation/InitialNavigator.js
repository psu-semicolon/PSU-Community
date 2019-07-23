import React from 'react';
import { createDrawerNavigator, createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';

import SplashScreen from '../screens/SplashScreen';

import AppNavigator from './AppNavigator';



export default createAppContainer(createSwitchNavigator({
    Splash: SplashScreen,
    App: AppNavigator
}));


