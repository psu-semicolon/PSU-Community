import React from "react";
import {
StyleSheet,
View,
ActivityIndicator,
FlatList,
Text,
TextInput,
TouchableOpacity
} from "react-native";

import Location_ViewScreen from './Location_ViewScreen';

import HomeScreen from './HomeScreen';


import ActionButton from 'react-native-action-button';

import { Icon, Button } from 'react-native-elements'


export default class Location_ListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'PSU-Community',
    headerLeft: 
    <View style={styles.icon}>
    <Icon
        name='menu'      
        color='#FFFFFF'
        onPress = {()=> {
          navigation.openDrawer();
        }
      }
    />
    </View>
   ,
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
constructor(props) {
 super(props);
 this.state = {
   loading: true,
   text: '',
  };
  this.arrayholder = [] ;
}



componentDidMount(){
//fetch("https://jsonplaceholder.typicode.com/users",{
//fetch("http://192.168.2.42/ServiceAPI/public/api/location",{
//fetch("http://172.22.108.15/ServiceAPI/public/api/location",{
fetch("http://kbwservice.psu.ac.th/api/location",{
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
  });
  this.arrayholder = responseJson.location;
})
.catch(error=>console.log(error)) //to catch the errors if any
}

SearchFilterFunction(text){
     
  const newData = this.arrayholder.filter(function(item){
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
  })
  this.setState({
      dataSource: newData,
      text: text
  })
}


FlatListItemSeparator = () => {
return (
    <View style={{
      height: .5,
      width:"100%",
      backgroundColor:"rgba(0,0,0,0.5)",
      
    }}/>
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
  <View style={styles.SectionStyle}>
  <Icon style={styles.searchIcon} name="search" size={20} color='#696969'/>
  <TextInput 
      style={styles.TextInputStyleClass}
      onChangeText={(text) => this.SearchFilterFunction(text)}
      value={this.state.text}
      underlineColorAndroid='transparent'
      placeholder="ค้นหาสถานที่ เช่น 7-eleven,อาหาร"
   /> 
 </View>
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
            param_latitude: Number(data.item.latitude),
            param_longitude: Number(data.item.longitude)
          })
        }} 
        style={styles.list}
      >
      <Text style={styles.lightText}>{data.item.name}</Text>
      <Text style={styles.lightText}>{data.item.grouptype}</Text>
      <View style={styles.button}>
      <Button
            onPress={() => {
              navigate('Direction', {
                param_id: data.item.id, 
                param_name: data.item.name,
                param_grouptype: data.item.grouptype,
                param_latitude: Number(data.item.latitude),
                param_longitude: Number(data.item.longitude)
              })
            }} 
            title="ไปยังแผนที่"
      />
      </View>
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
   },
   TextInputStyleClass:{
    textAlign: 'center',
    borderWidth: 0,
    borderColor: '#FFF',
   },
  button: {
    backgroundColor: '#48BBEC',
    borderColor: '#E6E6FA',
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 15,
    marginBottom: 10,
    marginRight: 15,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  searchIcon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: 40,
    borderRadius: 7 ,
    margin: 10
  }
});