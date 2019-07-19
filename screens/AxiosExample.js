import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import axios from 'axios';

export default class AxiosExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

 getEmployee() {
  //axios.get('http://127.0.0.1/ServiceAPI/public/locate_select')
  axios.get('http://dummy.restapiexample.com/api/v1/employees')
      .then(responseJson => {
        //const emps = res.data;
        //this.setState({ emps });
        console.log(responseJson);
      })
 }
 componentDidMount(){
   this.getEmployee();
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