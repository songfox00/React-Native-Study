import React, {PureComponent} from 'react';
import {View, Alert, Platform, PermissionsAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Config from 'react-native-config';

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

class Map extends PureComponent {
  state = {
    latitude: 0,
    longitude: 0,
    address: '',
  };

  UNSAFE_componentWillMount() {
    requestPermission().then(result => {
      console.log({result});
      if (result === 'granted') {
        // this.state.watchId =
        Geolocation.getCurrentPosition(
          pos => {
            const {latitude, longitude} = pos.coords;
            console.log('changed: ', latitude, '', longitude);
            this.setState({
              latitude: latitude,
              longitude: longitude,
              // location : [...this.state.location, {latitude, longitude}],
            });

            fetch(
              'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                this.state.latitude +
                ',' +
                this.state.longitude +
                '&language=ko&key=' +
                Config.GEOCODING_API,
            )
              .then(response => response.json())
              .then(resJson => {
                console.log(
                  'geocoding: ',
                  resJson.results[0].formatted_address,
                );
                this.setState({
                  address: resJson.results[0].formatted_address,
                });
                // Alert.alert('현재 주소', resJson.results[0].formatted_address, [
                //   {text: '확인', onPress: () => {}},
                // ]);
              })
              .catch(err => console.log('geocoding err: ', err));
          },
          error => {
            comsole.log(error);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 100,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.01,
          }}
          onRegionChange={region => {
            this.setState({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          onRegionChangeComplete={region => {
            this.setState({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            title="현재 위치"
            description={this.state.address}
            onPress={() => {}}
          />
        </MapView>
      </View>
    );
  }
}

export default Map;
