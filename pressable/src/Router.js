import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import AppEventEmitter from './AppEventEmitter';
class Router extends Component {
  check = () => {
    console.log("I'm Router");
  };

  componentDidMount() {
    AppEventEmitter.addListener('check', this.check);
  }

  componentWillUnmount() {
    AppEventEmitter.removeListener('check', this.check);
  }

  render() {
    return (
      <SafeAreaView
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <TouchableOpacity
          style={{marginBottom: 20}}
          onPress={() => {
            this.props.navigation.navigate('Press');
          }}>
          <Text style={{color: 'black'}}>Pressable</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginBottom: 20}}
          onPress={() => {
            this.props.navigation.navigate('Map');
          }}>
          <Text style={{color: 'black'}}>Map 함수</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default Router;
