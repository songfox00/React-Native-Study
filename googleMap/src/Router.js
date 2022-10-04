import React, {PureComponent} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

class Router extends PureComponent {
  state = {
    latitude: 0,
    longitude: 0,
    watchId: null,
    location: [],
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

    // if (this.state.watchId !== null) {
    //   Geolocation.clearWatch(this.state.watchId);
    // }
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
          {/* {this.state.location.map((loc, index) => ( */}
          <Marker
            // key={index}
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
          />
          {/* ))} */}
        </MapView>
      </View>
    );
  }
}

export default Router;
