import React, {useEffect} from 'react';
import {Alert, Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

export default App = () => {
  useEffect(() => {
    const checkToken = async () => {
      // await firebase.initializeApp(credentials, config);
      const token = await messaging().getToken();
      if (token) console.log(token);

      DeviceInfo.getDeviceName().then(deviceName => {
        console.log('deviceName: ', deviceName);
      });
      console.log('model: ', DeviceInfo.getModel());
      console.log('DeviceId:', DeviceInfo.getDeviceId());
    };
    checkToken();
  });

  useEffect(() => {
    const notice = messaging().onMessage(async remoteMessage => {
      Alert.alert('fcm message arrived', JSON.stringify(remoteMessage));
    });
    return notice;
  });

  return <Text>App</Text>;
};
