import React, {PureComponent} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Router from './src/Router';

requestPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
};

class App extends PureComponent {
  state = {
    latitude: 0,
    longitude: 0,
  };

  render() {
    return <Router location={this.state} />;
  }
}

export default App;
