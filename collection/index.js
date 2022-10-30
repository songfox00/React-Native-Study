/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { App as LinkingApp } from './src/Linking/App';
import { App as TopTabApp } from './src/TopTabs/App';
import { App as ElectricCarApp } from './src/ElectricCar/App'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => ElectricCarApp);
