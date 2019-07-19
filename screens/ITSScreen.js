import React from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { AsyncStorage, BackHandler } from 'react-native'

export default class ITSScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      doccode_budyear: '',      
    };    
  }
  
  static navigationOptions = {
    header: null,        
  }
  
  componentWillMount() {
    const {navigate} = this.props.navigation;    
    /*AsyncStorage.multiGet(['username', 'password']).then((data) => {
        let username = data[0][1];
        let password = data[1][1];

        //if (username !== 'tonlove') {
        if(typeof username !== 'string' || username === null || username === undefined) {
          navigate('SignIn', {name: 'User'})        
        }
    });*/    
  }

  handlePress = async () => {
    const { doccode_budyear } = this.state;   
    fetch(

      'http://kbwhub.psu.ac.th/its/getForm?doccode_budyear=' + doccode_budyear,

      //'http://localhost/ServiceAPI/public/locate_select',

      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },     
      }
    )
    .then((response) => response.json())
    .then((responseJson) => {

      
      Alert.alert(responseJson[0].budyear);

      //Alert.alert(responseJson[0].name);      
      

      const status_code = '';
      const status_text = '';      
      //this.status_code = responseJson[0].status;
      
      /* switch-case condition */
      switch (this.status_code) {
        case '0' :
        case '1' :
        case '2' : this.status_text = 'กำลังดำเนินการซ่อม'; break;
        case '3' :
        case '4' : this.status_text = 'งานเสร็จ'; break;
        case '5' :
        case '6' : this.status_text = 'รับคืนแล้ว'; break;
        case '7' : this.status_text = 'รออะไหล่'; break;
        case '99' : this.status_text = 'ยังไม่ระบุ'; break;
        default : this.status_text = 'ยังไม่ระบุ'; break;
      }
      
      /* if condition */
      /*
        if(this.status_code === '0' || this.status_code === '1' || this.status_code === '2'){
          this.status_text = 'กำลังดำเนินการซ่อม';
        }
        else if(this.status_code === '3' || this.status_code === '4'){
          this.status_text = 'งานเสร็จ';
        }
        else if(this.status_code === '5' || this.status_code === '6'){
          this.status_text = 'รับคืนแล้ว';
        }
        else if(this.status_code === '7'){
          this.status_text = 'รออะไหล่';
        }
        else if(this.status_code === '99'){
          this.status_text = 'ยังไม่ระบุ';
        }
        else {
          this.status_text = 'ยังไม่ระบุ';
        }
      */
      //Alert.alert("เลขฟอร์ม:  " + responseJson[0].doccode + "/" + responseJson[0].budyear + "\nสถานะบริการ: " + this.status_text);
      
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          สถานะบริการ IT Services
        </Text>
        <Text>
          (เลขฟอร์ม)
        </Text>
        <TextInput
          value={this.state.doccode_budyear}
          onChangeText={(doccode_budyear) => this.setState({ doccode_budyear })}
          placeholder={'เลขฟอร์ม เช่น 0001/61, 0899/61 0200/62'}
          style={styles.input}
          containerStyle={{flexGrow: 1}}
        />      
        <Button
          title={'Search'}
          style={styles.input}
          onPress={this.handlePress.bind(this)}>         
        </Button>            
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

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
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    fontWeight: '900',
  },  
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});