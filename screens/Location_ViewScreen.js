
import React from 'react'
import { Icon } from 'react-native-elements'
import { Button, Alert, StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight, TouchableWithoutFeedback  } from 'react-native'
import Form from 'react-native-advanced-forms'

import Location_EditScreen from './Location_EditScreen';

export default class Location_ViewScreen extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      TextInputName: '',
      TextInputGrouptype: '',
      TextInputLatitude: '',
      TextInputLongitude: '',
    }

  }

/*
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "My Profile!",
    headerRight: <Button title="Menu" onPress={()=>{ navigation.navigate('Edit'); }} />,
  });
*/
  
  static navigationOptions = ({ navigation }) => ({
    title: 'รายละเอียด',
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

  componentDidMount(){
 
    this.setState({ 
      TextInputName: this.props.navigation.getParam('param_name'),
      TextInputGrouptype: this.props.navigation.getParam('param_grouptype'),
      TextInputLatitude: this.props.navigation.getParam('param_latitude'),
      TextInputLongitude: this.props.navigation.getParam('param_longitude'),
    })

   }
  
  ShowLocation(){
    //fetch("https://jsonplaceholder.typicode.com/users",{
    fetch("http://192.168.2.40/ServiceAPI/public/api/location",{
    //fetch("http://172.22.108.157/ServiceAPI/public/api/location/"+p_id ,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },     
      }
    )
    .then(response => response.json())
    .then((responseJson)=> {
      //Alert.alert(responseJson.location.name);
      this.setState({
       loading: false,
       dataSource: responseJson.location
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
  }

  DeleteLocation = () =>{

    const p_id = this.props.navigation.getParam('param_id');
    const p_name = this.props.navigation.getParam('param_name');
    const p_grouptype = this.props.navigation.getParam('param_grouptype');
    const p_latitude = this.props.navigation.getParam('param_latitude');
    const p_longitude = this.props.navigation.getParam('param_longitude');


    //fetch("http://192.168.2.40/ServiceAPI/public/api/location/"+p_id ,{    
    fetch("http://172.22.108.15/ServiceAPI/public/api/location/"+p_id ,{
          method: 'delete',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
    })
    .then((response) => response.json())
    .then((responseJson) => {
  
      // Showing response message coming from server after inserting records.
      Alert.alert(responseJson);
  
    }).catch((error) => {
       console.error(error);
    });

    this.props.navigation.navigate('List');

}



  render() {
    //const dataT = this.state.dataSource;
    const {navigate} = this.props.navigation;
    const {
      place, group, latitude, longitude,
    } = this.state

    return (
      
      <View style={styles.container}>
       <ScrollView>

          <Text style={styles.text}>ชื่อสถานที่ :</Text>
          <TextInput editable={false} style={styles.textArea}>
            {this.props.navigation.getParam('param_name')}
          </TextInput>

          <Text style={styles.text}>กลุ่ม :</Text>
          <TextInput editable={false} style={styles.textArea}>
            {this.props.navigation.getParam('param_grouptype')}
          </TextInput>

          <Text style={styles.text}>ละติจูด :</Text>
          <TextInput editable={false} style={styles.textArea}>
            {this.props.navigation.getParam('param_latitude')}
          </TextInput>

          <Text style={styles.text}>ลองจิจูด :</Text>
          <TextInput editable={false} style={styles.textArea}>
            {this.props.navigation.getParam('param_longitude')}
          </TextInput>
              
        <View style={styles.button}>
          <Button
            onPress={ () => {
              navigate('Edit',{
                param_id:this.props.navigation.getParam('param_id'),
                param_name:this.props.navigation.getParam('param_name'),
                param_grouptype:this.props.navigation.getParam('param_grouptype'),
                param_latitude:this.props.navigation.getParam('param_latitude'),
                param_longitude:this.props.navigation.getParam('param_longitude')              
              })
            }}
            title="แก้ไข"
          />
        </View>

        <View style={styles.button}>
          <Button
            //onPress={this.DeleteLocation}
            onPress={() => {}}
            title="ลบ"
          />
        </View>
       </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  
  text: {
    marginBottom: 5,
    fontSize: 20,
  },
  textArea: {
    fontSize:15,
    height: 40,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor : '#FFFFFF',
    borderColor: '#E6E6FA',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    height: 30,
    backgroundColor: '#48BBEC',
    borderColor: '#E6E6FA',
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  error: {
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,

  },
  errorMsg: {
    color: 'red'
  },
  icon: {
    paddingLeft: 10,
  }
})