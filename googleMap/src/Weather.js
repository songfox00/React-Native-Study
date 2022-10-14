import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import Config from 'react-native-config';
import Geolocation from 'react-native-geolocation-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';

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

class Weather extends PureComponent {
  state = {
    latitude: 0,
    longitude: 0,
    cur_weather: '',
    cur_address: '',
    cur_temp: '',
    cur_icon: '',
    description: '',
  };

  readweather = () => {
    requestPermission().then(result => {
      console.log({result});
      if (result === 'granted') {
        // this.state.watchId =
        Geolocation.getCurrentPosition(
          async pos => {
            const {latitude, longitude} = pos.coords;
            console.log('changed: ', latitude, '', longitude);
            this.setState({
              latitude: latitude,
              longitude: longitude,
              // location : [...this.state.location, {latitude, longitude}],
            });
            await fetch(
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

            await fetch(
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

                console.log(weather);
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
  };

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

    const {cur_address, cur_temp, cur_weather, description} =
      this.props.navigation.state.params.state;
    // console.log();
    return (
      <LinearGradient
        colors={['#646FD4', '#646FD4', '#9BA3EB']}
        style={styles.view}>
        <View style={styles.addressView}>
          <Text style={styles.address}>{cur_address}</Text>
          <Ionicons name="location-outline" size={35} color="#fff" />
        </View>
        <View style={styles.weatherView}>
          <View>
            <Text style={styles.temp}>{cur_temp}°C</Text>
            <Text style={styles.weather}>{cur_weather}</Text>
            <Text style={styles.des}>{description}</Text>
          </View>
          <View>
            <Fontisto
              name={icons[cur_weather]}
              size={90}
              color="#fff"
              style={{marginTop: 20}}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    // justifyContent: 'center',
  },
  addressView: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
    marginTop: 30,
  },
  address: {
    fontSize: 30,
    color: '#fff',
  },
  weatherView: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    alignItems: 'center',
  },
  temp: {
    fontSize: 30,
    marginRight: 40,
    color: '#fff',
  },
  weather: {
    fontSize: 22,
    color: '#fff',
  },
  des: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Weather;
