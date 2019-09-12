
import React from 'react'
import { Button, 
         Alert, 
         StyleSheet, 
         Text, 
         View,
         ScrollView,
         TextInput,
         TouchableOpacity, } from 'react-native'
import Form from 'react-native-advanced-forms'
import { MaterialDialog } from 'react-native-material-dialog';
import { ConfirmDialog } from 'react-native-simple-dialogs';
//import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class Location_AddScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'เพิ่มสถานที่',
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
  
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      TextInputName: '',
      TextInputGrouptype: '',
      TextInputLatitude: '',
      TextInputLongitude: '',
    }
  }


  InsertDataToServer = () =>{
 
    const { TextInputName }  = this.state ;
    const { TextInputGrouptype }  = this.state ;
    const { TextInputLatitude }  = this.state ;
    const { TextInputLongitude }  = this.state ;

    alert('TextInputName: ' + TextInputName);
    alert('TextInputGrouptype: ' + TextInputGrouptype);
    alert('TextInputLatitude: ' + TextInputLatitude);
    alert('TextInputLongitude: ' + TextInputLongitude);

    
    
   //fetch("http://192.168.2.40/ServiceAPI/public/api/location",{ 
   fetch('http://172.22.108.15/ServiceAPI/public/api/location', {
     method: 'post',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    
       name: TextInputName,
    
       grouptype: TextInputGrouptype,
    
       latitude: TextInputLatitude,

       longitude: TextInputLongitude
    
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
    
   // Showing response message coming from server after inserting records.
           Alert.alert(responseJson);
    
         }).catch((error) => {
           console.error(error);
         });
    
    
  }

  render() {
    const {navigate} = this.props.navigation;

    return (

      <View style={styles.container}>
       <ScrollView>

        <Text style={styles.text}>ชื่อสถานที่ :</Text>
          <TextInput 
            style={styles.textArea} 
            value={this.state.TextInputName} 
            onChangeText={TextInputName => this.setState({TextInputName})} 
            placeholder="กรุณาชื่อสถานที่"
          />

        <Text style={styles.text}>กลุ่ม :</Text>
          <TextInput 
            style={styles.textArea}
            value={this.state.TextInputGrouptype} 
            onChangeText={TextInputGrouptype => this.setState({TextInputGrouptype})} 
            placeholder="กรุณากรอกกลุ่ม"
          />
      
        <Text style={styles.text}>ละติจูด :</Text>
            <TextInput 
              style={styles.textArea} 
              value={this.state.TextInputLatitude} 
              onChangeText={TextInputLatitude => this.setState({TextInputLatitude})}  
              placeholder="กรุณากรอกละติจูด"
            />

          <Text style={styles.text}>ลองจิจูด :</Text>
          <TextInput 
            style={styles.textArea} 
            value={this.state.TextInputLongitude} 
            onChangeText={TextInputLongitude => this.setState({TextInputLongitude})}  
            placeholder="กรุณากรอกลองจิจูด"
          />


        <View style={styles.button}>
          <Button
            onPress={this.InsertDataToServer}
            //onPress={() => {}}
            title="บันทึก"

          />
        </View>

        <View style={styles.button}>
          
          <Button
            onPress={ () => 
              navigate('List') 
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
  row: {
    marginBottom: 20,
  },
  columns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  field: {
    marginRight: 10,
    fontSize: 20,
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
  text: {
    marginBottom: 5,
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,
  },
  errorMsg: {
    color: 'red'
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
  }
})

         /*<ConfirmDialog
          title="Confirm Dialog"
          message="Are you sure about that?"
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: true})}
          positiveButton={{
              title: "YES",
              onPress: () => Alert.alert('Submitted: ' + JSON.stringify(values))
          }}
          negativeButton={{
              title: "NO",
              onPress: () => alert("No touched!")
          }}


          <ConfirmDialog
          title="Confirm Dialog"
          message="Are you sure about that?"
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          positiveButton={{
              title: "YES",
              onPress: () => alert("Yes touched!")
          }}
          negativeButton={{
              title: "NO",
              onPress: () => alert("No touched!")
          }}
      />
    */