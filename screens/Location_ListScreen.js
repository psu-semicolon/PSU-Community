import React from "react";
import {
StyleSheet,
View,
ActivityIndicator,
FlatList,
Text,
TouchableOpacity
} from "react-native";

import Location_ViewScreen from './Location_ViewScreen';

import ActionButton from 'react-native-action-button';

import { Icon } from 'react-native-elements'


export default class Location_ListScreen extends React.Component {
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
   loading: true,
   dataSource:[]
  };
}



componentDidMount(){
//fetch("https://jsonplaceholder.typicode.com/users",{
//fetch("http://192.168.2.40/ServiceAPI/public/api/location",{
fetch("http://172.22.108.157/ServiceAPI/public/api/location",{
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },     
  }
)
.then(response => response.json())
.then((responseJson)=> {
  this.setState({
   loading: false,
   dataSource: responseJson.location
  })
})
.catch(error=>console.log(error)) //to catch the errors if any
}
FlatListItemSeparator = () => {
return (
  <View style={{
     height: .5,
     width:"100%",
     backgroundColor:"rgba(0,0,0,0.5)",
     
}}
/>
);
}


render(){ 
  const {navigate} = this.props.navigation;
 if(this.state.loading){
  return( 
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="#0c9"/>
    </View>
)}
return(
 <View style={styles.container}>
 <FlatList
    data= {this.state.dataSource}
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    //renderItem= {item=> this.renderItem(item)}
    renderItem= {data=>
      <TouchableOpacity 
        onPress={() => {
          navigate('View', {
            param_id: data.item.id, 
            param_name: data.item.name,
            param_grouptype: data.item.grouptype,
            param_latitude: data.item.latitude,
            param_longitude: data.item.longitude
          })
        }} 
        style={styles.list}
      >
      <Text style={styles.lightText}>{data.item.name}</Text>
      <Text style={styles.lightText}>{data.item.grouptype}</Text>
      </TouchableOpacity>
    }
    keyExtractor= {item=>item.id.toString()}
 />

  <ActionButton buttonColor="rgba(231,76,60,1)" onPress = {()=> {navigate('Add')}}>           
  </ActionButton>
</View>
)
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
   },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  list:{
    paddingVertical: 4,
    paddingLeft: 10,
    margin: 5,
    backgroundColor: "#fff"
   }
});