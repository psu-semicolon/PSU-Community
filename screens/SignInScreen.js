import React from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { WebBrowser } from 'expo';




export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };    
  }

  componentDidMount(){
     //to catch the errors if any
  }

  onSingIn() {
    const { username, password } = this.state;    

    const {navigate} = this.props.navigation;

    
    

    if(username === '' || password === '') {
      Alert.alert('Sign In', `กรุณาระบุผู้ใช้งานและรหัสผ่าน`); 
    }
    else {
      if(typeof username === 'string' && username !== null && username !== undefined &&
        typeof password === 'string' && password !== null && password !== undefined) {

          fetch("http://kbwservice.psu.ac.th/api/psu/login/"+username+"/"+password ,{
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
            dataSource: responseJson
            })

            if(responseJson.status == 'Y')
            {
              navigate('List', {name: username})
            }
            else{
              //navigate('Home', {name: 'User'})
              Alert.alert('Sign In', `ผู้ใช้งานไม่ถูกต้อง/รหัสผ่านไม่ถูกต้อง`);
            }
            
          })
          .catch(error=>console.log(error));
        
        /*  
        if(username === 'admin' && password === '1234') {
          //Alert.alert('Sign In', `ผู้ใช้: ${username} , รหัสผ่าน: ${password}`);
          AsyncStorage.multiSet([
              ["username", username],
              ["password", password]
          ]);
          navigate('Home', {name: 'User'})
        }
        else{
          Alert.alert('Sign In', `ผู้ใช้งานและ/หรือรหัสผ่านไม่ถูกต้อง`); 
        }*/
      }    
    }
  }

  onSingUp() {
    const { username, password } = this.state;    
    //Alert.alert('Credentials', `${username} + ${password}`);
    const {navigate} = this.props.navigation;      
    navigate('SingUp', {name: 'Jane'})
  } 

  render() {    
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          PSU-Community
        </Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />        
        <Button
          title={'Sign in'}
          style={styles.input} 
          onPress={this.onSingIn.bind(this)}            
        />        
                
        
      </View>
    );
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6FA',
  },
  header: {
    alignItems: 'center',
    fontWeight: '900',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 7,
  },  
  button: {
    backgroundColor: 'green',
    width: 300,
    height: 44,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

/*<View style={styles.helpContainer}>
          <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Sign in with Facebook.</Text>
          </TouchableOpacity>
        </View>*/