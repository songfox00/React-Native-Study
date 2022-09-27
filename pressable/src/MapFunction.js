import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class MapFunction extends Component {
  state = {
    test: ['test1', 'test2', 'test3', 'test4'],
    testList: [],
  };

  static getDerivedStateFromProps(props, state) {
    return {
      testList: state.test.map((text, index) => (
        <Text style={{color: '#171717', marginBottom: 20}} key={index}>
          {text}
        </Text>
      )),
    };
  }

  onCLickFunc = () => {
    console.log('일반 함수 클릭됨');
  };

  onClickId = current => {
    console.log(current, '함수 클릭됨');
  };

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        {this.state.testList}
        <TouchableOpacity style={{marginBottom: 20}} onPress={this.onCLickFunc}>
          <Text>일반 함수</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onClickId('파라미터')}>
          <Text>파라미터 함수</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapFunction;
