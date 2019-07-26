import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';

import MapView, { Marker, Callout, ProviderPropType } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Location_DirectionScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'นำทาง',
    headerStyle: {
      backgroundColor: '#3366CC',
      
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow:1,
      alignSelf:'center',
      marginRight: 70,
    },
  });

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
    this.setState({ location }); 

    let j_latitude = JSON.stringify(location.coords.latitude);            
    this.setState({ latitude: j_latitude });

    let j_longitude = JSON.stringify(location.coords.longitude);
    this.setState({ longitude: j_longitude });
 
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
            latitude: LTT, 
            longitude: LGT,
            //latitude: 7.00891383730039,   // "ศูนย์คอมพิวเตอร์"
            //longitude: 100.4983782894092, // "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"            
            latitudeDelta: 0.01,
            longitudeDelta: 0.01 * ASPECT_RATIO,
          }}>
          
          <Marker
            coordinate={{
              latitude: Number(this.state.latitude), 
              longitude: Number(this.state.longitude),
              //latitude: 7.00891383730039,   // "ศูนย์คอมพิวเตอร์"
              //longitude: 100.4983782894092, // "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"     
              //latitude: 7.00318,   // "7-Eleven 8 คณะแพทย์ ม.อ."
              //longitude: 100.494961, //          
            }}
            title={"My location"}
            description={"ที่อยู่ปัจจุบันของฉัน"}
          />
          <Marker
            coordinate={{
              //latitude: Number(this.state.latitude), 
              //longitude: Number(this.state.longitude),
              //latitude: 7.00891383730039,   // "ศูนย์คอมพิวเตอร์"
              //longitude: 100.4983782894092, // "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"
              latitude: LTT,   // "7-Eleven 8 คณะแพทย์ ม.อ."
              longitude: LGT, // 
              
            }}
            title={this.props.navigation.getParam('param_name')}
            description={"มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"}
          />

          <MapViewDirections 
            origin={{ 
              latitude: Number(this.state.latitude), 
              longitude: Number(this.state.longitude)
              //latitude: 7.00891383730039,   // "ศูนย์คอมพิวเตอร์"
              //longitude: 100.4983782894092, // "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"
              //latitude: 7.00318,   // "7-Eleven 8 คณะแพทย์ ม.อ."
              //longitude: 100.494961, // 
              }} 
            destination={{
              //latitude: Number(this.state.latitude), 
              //longitude: Number(this.state.longitude)
              //latitude: 7.00891383730039,   // "ศูนย์คอมพิวเตอร์"
              //longitude: 100.4983782894092, // "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"
              latitude: LTT,   // "7-Eleven 8 คณะแพทย์ ม.อ."
              longitude: LGT, // 
              }}
              apikey={"Google Api Direction"} 
              strokeWidth={3}
              strokeColor="hotpink"
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