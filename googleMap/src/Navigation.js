import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Router from './Router';
import Weather from './Weather';
import Map from './Map';

const AppNavigator = createStackNavigator(
  {
    Router: {
      screen: Router,
      navigationOptions: {
        headerShown: false,
      },
    },
    Weather: {
      screen: Weather,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#646FD4',
        },
        headerTitleAlign: 'center',
        title: '현재 날씨',
        headerTintColor: '#fff',
      },
    },
    Map: {
      screen: Map,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#646FD4',
        },
        headerTitleAlign: 'center',
        title: '현재 위치',
        headerTintColor: '#fff',
      },
    },
  },
  {
    initialRouteName: 'Router',
  },
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
