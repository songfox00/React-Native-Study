/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { App as LinkingApp } from './src/Linking/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => LinkingApp);
