
import React from 'react'
import { Icon } from 'react-native-elements'
import { Button, Alert, StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight, TouchableWithoutFeedback  } from 'react-native'
import Form from 'react-native-advanced-forms'

import Location_EditScreen from './Location_EditScreen';

export default class Location_ViewScreen extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      place: null,
      latitude: null,
      longitude: null,
      group: null,
    }

  }

/*
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "My Profile!",
    headerRight: <Button title="Menu" onPress={()=>{ navigation.navigate('Edit'); }} />,
  });
*/
  
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'PSU-Community',
    headerLeft: 
      <Icon
          name='arrow-back'
          
          color='#FFFFFF'
          onPress = {()=> {
            navigation.navigate('List')
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
  
  componentDidMount(){
  
    const p_id = this.props.navigation.getParam('param_id');
    const p_name = this.props.navigation.getParam('param_name');
    const p_grouptype = this.props.navigation.getParam('param_grouptype');
    const p_latitude = this.props.navigation.getParam('param_latitude');
    const p_longitude = this.props.navigation.getParam('param_longitude');


    //fetch("https://jsonplaceholder.typicode.com/users",{
    //fetch("http://192.168.2.40/ServiceAPI/public/api/location",{
    fetch("http://172.22.108.157/ServiceAPI/public/api/location/"+p_id ,{
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

  render() {
    //const dataT = this.state.dataSource;
    const {navigate} = this.props.navigation;
    const {
      place, group, latitude, longitude,
    } = this.state

    return (
      
      <View style={styles.container}>     
       <ScrollView>
        <Text style={styles.text}>สถานที่</Text>
        <Form ref={this._onFormRef} onChange={this.onChange} onSubmit={this.onSubmit} validate={this.validate} >

          <Form.Layout style={styles.row}>
              <Form.Field name="place" label="ชื่อสถานที่ :" style={styles.field}>
                <Form.TextField value={this.props.navigation.getParam('param_name')}/>
              </Form.Field>
          </Form.Layout>

          <Form.Layout style={styles.row}>
            <Form.Field name="group" label="กลุ่ม :" style={styles.field}>
             <Form.TextField value={this.props.navigation.getParam('param_grouptype')}/>
            </Form.Field>
          </Form.Layout>
          
          <Form.Layout style={styles.row}>
              <Form.Field name="latitude" label="ละติจูด :" style={styles.field}>
               <Form.TextField value={this.props.navigation.getParam('param_latitude')}/>
              </Form.Field>
            </Form.Layout>
          
          <Form.Layout style={styles.row}>
            <Form.Field name="longitude" label="ลองจิจูด :" style={styles.field}>
            <Form.TextField value={this.props.navigation.getParam('param_longitude')}/>
            </Form.Field>
          </Form.Layout>

        </Form>
        

        <View style={styles.button}>
          <Button
            onPress={ () => 
              navigate('Edit') 
            }
            title="แก้ไข"
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={ () => 
              navigate('Edit') 
            }
            title="ลบ"
          />
        </View>
       </ScrollView>
      </View>
    )
  }

  _onFormRef = e => {
    this.form = e
  }

  onChange = (values) => {
    this.setState(values)
  }

  onSubmit = (values) => {
    Alert.alert('Submitted: ' + JSON.stringify(values))
    //onPress={() => navigate('EntryStack')}
  }

  validate = (values) => {
    const ret = Object.keys(this.state).reduce((m, v) => {
      if (!values[v] || !values[v].length) {
        m[v] = Form.VALIDATION_RESULT.MISSING
      }
      return m
    }, {})

    /*if (!ret.age && isNaN(values.age)) {
      ret.age = Form.VALIDATION_RESULT.INCORRECT
    }*/

    return ret
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    paddingTop: 30,
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
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,
  },
  param: {
    fontSize: 20,
  },
  errorMsg: {
    color: 'red'
  }
})