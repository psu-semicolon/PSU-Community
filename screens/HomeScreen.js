import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, Dimensions, Alert, TouchableOpacity} from 'react-native';

import MapView, { Marker, Callout, ProviderPropType } from 'react-native-maps';

import { Button } from 'react-native-elements';

import DialogInput from 'react-native-dialog-input';

import ActionButton from 'react-native-action-button';

import { Icon } from 'react-native-elements'


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 7.008945;
const LONGITUDE = 100.497930;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

/*function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}*/


export default class HomeScreen extends React.Component {
  

  static navigationOptions = ({ navigation }) => ({
    title: 'PSU-Community',
    headerLeft: 
      <Icon
          name='menu'      
          color='#FFFFFF'
          onPress = {()=> {
            navigation.openDrawer();
          }
        }
      />
   ,
    headerStyle: {
      backgroundColor: '#3366CC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      isDialogVisible: false,
    };
  }

  showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }
  sendInput(inputText){
    console.log("sendInput (DialogInput#1): "+inputText);
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: '#FF0000',
        },
      ],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={e => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>

        <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"ค้นหาสถานที่ที่ต้องการ"}
                    message={"เช่น ร้านอาหาร,ร้านกาแฟ,ร้านสะดวกซื้อ"}
                    submitInput={ (inputText) => {this.sendInput(inputText)} }
                    closeDialog={ () => {this.showDialog(false)}}>
        </DialogInput>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>Tap to create a marker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{this.showDialog(true)}}
            style={styles.bubble}
            >
            <Text>ค้นหา</Text>
            </TouchableOpacity>
        </View>

       
      </View>
    );
  }
}

HomeScreen.propTypes = {
  provider: ProviderPropType,
};

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
  }
});