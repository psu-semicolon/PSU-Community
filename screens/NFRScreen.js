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

export default class NFRScreen extends React.Component {  
  constructor(props) {
    super(props);
    
    this.state = {
      nbcode: '',      
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
    const { nbcode } = this.state;    
    fetch('http://nfr.cc.psu.ac.th/getdb_appointlap_ws.php?code=' + nbcode, {
      method: 'get',
      headers: {       
        'Content-Type': 'application/json',
      },     
    })
    .then((response) => response.json())
    .then((responseJson) => {
      Alert.alert("หมายเลขเครื่อง:  " + responseJson[0].nbCode + "\nกำหนดคืนเครื่อง: " + responseJson[0].appointlap_thai);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          ทดสอบกำหนดคืนเครื่องเช่า
        </Text>
        <Text>
          (CC-หมายเลขเครื่อง)
        </Text>
        <TextInput
          value={this.state.nbcode}
          onChangeText={(nbcode) => this.setState({ nbcode })}
          placeholder={'หมายเลขเครื่อง เช่น 001, 005, 013 เป็นต้น'}
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
