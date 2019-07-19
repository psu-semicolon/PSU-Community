import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import axios from 'axios';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    //return fetch('https://facebook.github.io/react-native/movies.json')
    return fetch('http://192.168.2.40/ServiceAPI/public/api/locate_select')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.location,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}