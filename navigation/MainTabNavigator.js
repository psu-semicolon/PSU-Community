import React from 'react';
import { Platform } from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';


import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ITSScreen from '../screens/ITSScreen';
import NFRScreen from '../screens/NFRScreen';
//import CoPTNewScreen from '../screens/CoPTNewScreen';
import FetchExample from '../screens/FetchExample';
import FetchExample2 from '../screens/FetchExample2';
import EntryScreen from '../screens/EntryScreen';
import AxiosExample from '../screens/AxiosExample';
import Location_DirectionScreen from '../screens/Location_DirectionScreen';
import Location_MapScreen from '../screens/Location_MapScreen';
import Location_ViewScreen from '../screens/Location_ViewScreen';
import Location_EditScreen from '../screens/Location_EditScreen';
import Location_AddScreen from '../screens/Location_AddScreen';
import Location_ListScreen from '../screens/Location_ListScreen';
import SignInScreen from '../screens/SignInScreen';
import SplashScreen from '../screens/SplashScreen';

const SplashStack = createStackNavigator({
  Splash: SplashScreen,
});

SplashStack.navigationOptions = {
  tabBarLabel: 'Splash',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const SignInStack = createStackNavigator({
  SignIn: SignInScreen,
});

SignInStack.navigationOptions = {
  tabBarLabel: 'Sign In',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


const MapStack = createStackNavigator({
  Map: Location_MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

const DirectionStack = createStackNavigator({
  Direction: Location_DirectionScreen,
});

DirectionStack.navigationOptions = {
  tabBarLabel: 'Direction',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ListStack = createStackNavigator({
  List: Location_ListScreen,
  Home: HomeScreen,
  Direction: Location_DirectionScreen,
  View: Location_ViewScreen,
  Edit: Location_EditScreen,
  Add: Location_AddScreen,
});

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused={focused}
    name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

const ViewStack = createStackNavigator({
  View: Location_ViewScreen,
});

ViewStack.navigationOptions = {
  tabBarLabel: 'View',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const EditStack = createStackNavigator({
  Edit: Location_EditScreen,
});

EditStack.navigationOptions = {
  tabBarLabel: 'Edit',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AddStack = createStackNavigator({
  Add: Location_AddScreen,
});

AddStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


const ITSStack = createStackNavigator({
  ITS: ITSScreen,
});

ITSStack.navigationOptions = {
  tabBarLabel: 'ITS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const NFRStack = createStackNavigator({
  NFR: NFRScreen,
});

NFRStack.navigationOptions = {
  tabBarLabel: 'NFR',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

/*
const COPTNewStack = createStackNavigator({
  COPTNew: CoPTNewScreen,
});

COPTNewStack.navigationOptions = {
  tabBarLabel: 'COPTNew',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};
*/

const FetchStack = createStackNavigator({
  Fetch: FetchExample,
});

FetchStack.navigationOptions = {
  tabBarLabel: 'Fetch',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const FetchStack2 = createStackNavigator({
  Fetch2: FetchExample2,
});

FetchStack2.navigationOptions = {
  tabBarLabel: 'Fetch2',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


const EntryStack = createStackNavigator({
  Entry: EntryScreen,
});

EntryStack.navigationOptions = {
  tabBarLabel: 'Entry',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AxiosStack = createStackNavigator({
  Axios: AxiosExample,
});

AxiosStack.navigationOptions = {
  tabBarLabel: 'Axios',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};



const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};





export default createBottomTabNavigator({
  ListStack,
  MapStack,
  //AddStack,
  //ViewStack,
  //EditStack,
  //HomeStack,

  //EntryStack, 
  //FetchStack,
  //FetchStack2,
  //AxiosStack,
  //ITSStack,
  //NFRStack,
  //COPTNewStack,
  //LinksStack,
  //SettingsStack,
});


