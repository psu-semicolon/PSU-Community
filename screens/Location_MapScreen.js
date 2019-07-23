import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';

import MapView, { Marker, Callout, ProviderPropType } from 'react-native-maps';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Location_MapSceen extends Component {
  state = {
    location: null,
    errorMessage: null,  
    latitude: null,
    longitude: null,
  };

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
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    alert(location.coords.latitude);
    alert(location.coords.longitude);
    this.setState({ location });    
    this.setState({ latitude }); 
    this.setState({ longitude }); 
         
  };

  render() {
    let text = 'Waiting..';  
    let myLo_latitude = this.state.latitude;
    let myLo_longitude = this.state.longitude;

    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      //alert('latitude: ' + this.state.location.coords.latitude);
      //alert('longitude: ' + this.state.location.coords.longitude);

      //myLo_latitude = Number(this.state.location.coords.latitude);
      //myLo_longitude =  Number(this.state.location.coords.longitude);

      //text = "Longitude: " + myLo_longitude + "\nLatitude: " + myLo_latitude;
    }

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
            latitude: 7.00891383730039, 
            longitude: 100.4983782894092,
            //latitude:  myLo_latitude , 
            //longitude:  myLo_longitude ,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001 * ASPECT_RATIO,
          }}>

          <Marker
            //coordinate={{ latitude: 7.008945, longitude: 100.497930 }}
            coordinate={{ latitude: 7.00891383730039, longitude: 100.4983782894092 }}
            //coordinate={{ latitude: myLo_latitude, longitude: myLo_longitude }}
            title={"ศูนย์คอมพิวเตอร์"}
            //title={myLo_latitude.toString()}
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