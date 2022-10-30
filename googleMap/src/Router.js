import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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

class Router extends Component {
  state = {
    latitude: 0,
    longitude: 0,
    cur_weather: '',
    cur_address: '',
    cur_temp: '',
    cur_icon: '',
    description: '',
  };

  readWeather() {
    requestPermission().then(result => {
      console.log({ result });
      if (result === 'granted') {
        // this.state.watchId =
        Geolocation.getCurrentPosition(
          pos => {
            const { latitude, longitude } = pos.coords;
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
                  resJson.results[0].address_components[1].long_name,
                );
                this.setState({
                  cur_address:
                    resJson.results[0].address_components[1].long_name,
                });
              })
              .catch(err => console.log('geocoding err: ', err));

            fetch(
              'https://api.openweathermap.org/data/2.5/weather?lat=' +
              this.state.latitude +
              '&lon=' +
              this.state.longitude +
              '&appid=' +
              Config.WEATHER_KEY,
            )
              .then(response => response.json())
              .then(resJson => {
                const weather = resJson.weather[0];
                let temp = Math.floor((resJson.main.temp - 273.15) * 100) / 100;

                console.log(resJson);
                this.setState({
                  cur_weather: weather.main,
                  cur_temp: temp.toFixed(1),
                  cur_icon: weather.icon,
                  description: weather.description,
                });
              })
              .catch(err => console.log('weather err ', err));
            //   .catch(err => console.log('weather err: ', err));
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
    const icons = {
      Thunderstorm: 'lightning',
      Drizzle: 'rain',
      Rain: 'rains',
      Snow: 'snow',
      Atmosphere: 'fog',
      Clear: 'day-sunny',
      Clouds: 'cloudy',
    };

    return (
      <LinearGradient
        colors={['#646FD4', '#646FD4', '#9BA3EB']}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{ marginBottom: 40 }}
          onPress={
            this.readWeather

            // this.props.navigation.navigate('Weather', {
            //   state: this.state,
            // cur_adress: this.state.cur_address,
            // cur_temp: this.state.cur_temp,
            // cur_weather: this.state.cur_weather,
            // description: this.state.description,
            // })
          }>
          <Text style={styles.text}>날씨 확인하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
          <Text style={styles.text}>위치 확인하기</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: '#fff',
  },
});

export default Router;
