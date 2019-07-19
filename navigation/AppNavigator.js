import React from 'react';
import { createDrawerNavigator, createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';

import MainTabNavigator from './MainTabNavigator';

import HomeScreen from '../screens/HomeScreen';

import MainDrawerNavigator from './MainDrawerNavigator';


/*
export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  //SignIn: SignInScreen,
  Main: MainTabNavigator,
}));
*/


export default createAppContainer(createDrawerNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html 
  Main: MainTabNavigator,
  SignIn: SignInScreen,
  Drawer: MainDrawerNavigator,
}));


navigator.navigationOptions = {
  drawerLabel: 'Demo Screen 1',
};