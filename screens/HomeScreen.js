import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, Dimensions, Alert, TouchableOpacity} from 'react-native';

import MapView, { Marker, Callout, ProviderPropType } from 'react-native-maps';

import { Button } from 'react-native-elements';

import DialogInput from 'react-native-dialog-input';

import ActionButton from 'react-native-action-button';

import { Icon } from 'react-native-elements'

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';



export default class HomeScreen extends React.Component {

  state = {
    location: null,
    errorMessage: null,
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'PSU-Community',
    headerStyle: {
      backgroundColor: '#3366CC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };



  render() {
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LTT = this.props.navigation.getParam('param_latitude');
    const LGT = this.props.navigation.getParam('param_longitude');

    
    return (
      
      <View style={styles.MainContainer}>

        
 
        <MapView
          style={styles.mapStyle}
          showsUserLocation={false}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            //latitude: 7.008945,
            //longitude: 100.497930,
            latitude: LTT,
            longitude: LGT,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001 * ASPECT_RATIO,
          }}>
 
          <Marker
            //coordinate={{ latitude: 7.008945, longitude: 100.497930 }}
            coordinate={{ latitude: LTT, longitude: LGT }}
            //title={"ศูนย์คอมพิวเตอร์"}
            title={this.props.navigation.getParam('param_name')}
            description={"มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"}
          />
 
        </MapView>
 
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});