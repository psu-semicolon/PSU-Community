
import React from 'react'
import { Button, 
         Alert, 
         StyleSheet, 
         Text, 
         View,
         ScrollView,
         TouchableOpacity, } from 'react-native'
import Form from 'react-native-advanced-forms'
import { MaterialDialog } from 'react-native-material-dialog';
import { ConfirmDialog } from 'react-native-simple-dialogs';
//import {createStackNavigator, createAppContainer} from 'react-navigation';
import EntryScreen from './EntryScreen';

export default class Location_AddScreen extends React.Component {
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
      place, group, latitude, longitude,
    } = this.state

    return (

      <View style={styles.container}>
       <ScrollView>
        <Text style={styles.text}>เพิ่มสถานที่</Text>
        <Form ref={this._onFormRef} onChange={this.onChange} onSubmit={this.onSubmit} validate={this.validate}>

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
            onPress={() =>this.form.validateAndSubmit()}
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

  _onFormRef = e => {
    this.form = e
  }

  onChange = (values) => {
    this.setState(values)
  }

  onSubmit(values){

  }

  validate = (values) => {
    const ret = Object.keys(this.state).reduce((m, v) => {
      if (!values[v] || !values[v].length) {
        m[v] = Form.VALIDATION_RESULT.MISSING
      }
      return m
    }, {})
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
  errorMsg: {
    color: 'red'
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