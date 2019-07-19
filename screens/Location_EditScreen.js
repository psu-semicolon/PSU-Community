
import React from 'react'
import { Button, Alert, StyleSheet, Text, View, ScrollView} from 'react-native'
import Form from 'react-native-advanced-forms'
//import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class Location_EditScreen extends React.Component {
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
  
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      place: null,
      latitude: null,
      longitude: null,
      group: null,
    }
  }

  static navigationOptions = {
    title: 'PSU-Community',
    headerStyle: {
      backgroundColor: '#3366CC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


  render() {
    const {navigate} = this.props.navigation;
    const {
      id, place, latitude, longitude, group
    } = this.state

    return (

      <View style={styles.container}>
       <ScrollView>
        <Text style={styles.text}>แก้ไขสถานที่</Text>
        <Form ref={this._onFormRef} onChange={this.onChange} onSubmit={this.onSubmit} validate={this.validate}>

          <Form.Layout style={styles.row}>
              <Form.Field name="place" label="รหัส :" style={styles.field}>
                <Form.TextField style={styles.id} editable={this.state.TextInputDisableHolder}  value={id} />
              </Form.Field>
          </Form.Layout>

          <Form.Layout style={styles.row}>
              <Form.Field name="place" label="ชื่อสถานที่ :" style={styles.field}>
                <Form.TextField value={place} placeholder="กรุณากรอกสถานที่"/>
              </Form.Field>
          </Form.Layout>

          <Form.Layout style={styles.row}>
            <Form.Field name="group" label="กลุ่ม :" style={styles.field}>
              <Form.TextField value={group} placeholder="กรุณากรอกกลุ่ม"/>
            </Form.Field>
          </Form.Layout>
          
          <Form.Layout style={styles.row}>
              <Form.Field name="latitude" label="ละติจูด :" style={styles.field}>
                <Form.TextField value={latitude} keyboardType='numeric' placeholder="กรุณากรอกละติจูด"/>
              </Form.Field>
            </Form.Layout>
          
          <Form.Layout style={styles.row}>
            <Form.Field name="longitude" label="ลองจิจูด :" style={styles.field}>
              <Form.TextField value={longitude} keyboardType='numeric' placeholder="กรุณากรอกลองจิจูด"/>
            </Form.Field>
          </Form.Layout>

        </Form>
        

        <View style={styles.button}>
          <Button
            onPress={() => this.form.validateAndSubmit()}
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

  _onFormRef = e => {
    this.form = e
  }

  onChange = (values) => {
    this.setState(values)
  }

  onSubmit = (values) => {
    Alert.alert('Submitted: ' + JSON.stringify(values))
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
  id: {
    backgroundColor: '#DCDCDC',
    height: 38,
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
  contentContainer: {
    paddingTop: 30,
  },
  errorMsg: {
    color: 'red'
  }
})