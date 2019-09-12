
import React from 'react'
import { Button,
         Alert, 
         StyleSheet, 
         Text, 
         TextInput, 
         View,
         ScrollView} from 'react-native'
import Form from 'react-native-advanced-forms'
//import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class Location_EditScreen extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      TextInputName: '',
      TextInputGrouptype: '',
      TextInputLatitude: '',
      TextInputLongitude: '',
    }
  }

  static navigationOptions = {
    title: 'แก้ไขสถานที่',
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
  };
   
  componentDidMount(){
 
    this.setState({ 
      TextInputName: this.props.navigation.getParam('param_name'),
      TextInputGrouptype: this.props.navigation.getParam('param_grouptype'),
      TextInputLatitude: this.props.navigation.getParam('param_latitude'),
      TextInputLongitude: this.props.navigation.getParam('param_longitude'),
    })

   }

  /*ShowLocation(){
  
    const p_id = this.props.navigation.getParam('param_id');
    const p_name = this.props.navigation.getParam('param_name');
    const p_grouptype = this.props.navigation.getParam('param_grouptype');
    const p_latitude = this.props.navigation.getParam('param_latitude');
    const p_longitude = this.props.navigation.getParam('param_longitude');

    fetch("http://192.168.2.40/ServiceAPI/public/api/location/"+p_id ,{    
    //fetch("http://172.22.108.157/ServiceAPI/public/api/location/"+p_id ,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then((responseJson)=> {
      //Alert.alert(responseJson.location.name);
      this.setState({
       loading: false,
       dataSource: responseJson.location
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
  }*/

  UpdateLocation(){
  
    const p_id = this.props.navigation.getParam('param_id');
    const p_name = this.props.navigation.getParam('param_name');
    const p_grouptype = this.props.navigation.getParam('param_grouptype');
    const p_latitude = this.props.navigation.getParam('param_latitude');
    const p_longitude = this.props.navigation.getParam('param_longitude');

    //fetch("http://192.168.2.40/ServiceAPI/public/api/location/"+p_id ,{    
    fetch("http://172.22.108.15/ServiceAPI/public/api/location/"+p_id ,{
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
          name: TextInputName,
       
          grouptype: TextInputGrouptype,
       
          latitude: TextInputLatitude,
   
          longitude: TextInputLongitude  
        })
    })
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


  render() {
    const {navigate} = this.props.navigation;
    const {
       id,place, latitude, longitude, group
    } = this.state

    return (

      <View style={styles.container}>
       <ScrollView>

          <Text style={styles.text}>รหัส :</Text>
          <TextInput editable={false} style={styles.textArea2}>
            {this.props.navigation.getParam('param_id')}
          </TextInput>

          <Text style={styles.text}>ชื่อสถานที่ :</Text>
          <TextInput style={styles.textArea} placeholder={'กรุณากรอกสถานที่'}>
            {this.props.navigation.getParam('param_name')}
          </TextInput>

          <Text style={styles.text}>กลุ่ม :</Text>
          <TextInput style={styles.textArea} placeholder={'กรุณากรอกกลุ่ม'}>
            {this.props.navigation.getParam('param_grouptype')}
          </TextInput>

          <Text style={styles.text}>ละติจูด :</Text>
          <TextInput style={styles.textArea} placeholder={'กรุณากรอกละติจูด'} keyboardType='numeric'>
            {this.props.navigation.getParam('param_latitude')}
          </TextInput>

          <Text style={styles.text}>ลองจิจูด :</Text>
          <TextInput style={styles.textArea} placeholder={'กรุณากรอกลองจิจูด'} keyboardType='numeric'>
            {this.props.navigation.getParam('param_longitude')}
          </TextInput>

        <View style={styles.button}>
          <Button
            //onPress={() => this.form.validateAndSubmit()}
            onPress={() => {}}
            title="บันทึก"
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={ () => 
              navigate('View') 
            }
            title="ยกเลิก"
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
  
  button: {
    height: 30,
    backgroundColor: '#48BBEC',
    borderColor: '#E6E6FA',
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  error: {
    marginTop: 10,
  },
  
  contentContainer: {
    paddingTop: 30,
  },
  errorMsg: {
    color: 'red'
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
  textArea2: {
    fontSize:15,
    height: 40,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor : '#DDDDDD',
    borderColor: '#E6E6FA',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,

  },

})