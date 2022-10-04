import React, {PureComponent} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

class Router extends PureComponent {
  state = {
    latitude: this.props.location.latitude,
    longitude: this.props.location.longitude,
    watchId: null,
    location: [],
  };

  UNSAFE_componentWillMount() {
    requestPermission().then(result => {
      console.log({result});
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            const {latitude, longitude} = pos.coords;
            console.log('changed: ', latitude, '', longitude);
            this.setState({
              latitude: latitude,
              longitude: longitude,
              // location: [
              //   ...this.state.location,
              //   {latitude: latitude, longitude: longitude},
              // ],
            });
            // console.log('location: ', this.state.location);
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
          // onRegionChange={region => {
          //   this.setState({
          //     latitude: region.latitude,
          //     longitude: region.longitude,
          //   });
          // }}
          // onRegionChangeComplete={region => {
          //   this.setState({
          //     latitude: region.latitude,
          //     longitude: region.longitude,
          //   });
          // }}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
          />
        </MapView>
      </View>
    );
  }
}

export default Router;
