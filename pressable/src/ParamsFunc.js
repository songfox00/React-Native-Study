import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AppEventEmitter from './AppEventEmitter';

class ParamsFunc extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => AppEventEmitter.emit('check')}>
          <Text>ParamsFunc</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ParamsFunc;
