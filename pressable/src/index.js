import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MapFunction from './MapFunction';
import Press from './Press';
import Router from './Router';
import ParamsFunc from './ParamsFunc';

const MapStack = createStackNavigator(
  {
    MapFunc: {screen: MapFunction},
    Func: {screen: ParamsFunc},
  },
  {
    initialRouteName: 'MapFunc',
    navigationOptions: {
      headerShown: false,
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    Router: {screen: Router},
    Map: MapStack,
    Press: {screen: Press},
  },
  {
    initialRouteName: 'Router',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
