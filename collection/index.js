/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { App as LinkingApp } from './src/Linking/App';
import { App as TopTabApp } from './src/TopTabs/App';
import { App as ElectricCarApp } from './src/ElectricCar/App';
import { App as BottomSheetModalApp } from './src/BottomSheetModal/App';
import { App as PanResponderApp } from './src/PanResponder/App';
import { App as BottomSheetApp } from './src/BottomSheet/App';
import { App as BottomSheetClassApp } from './src/BottomSheetClass/App';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => BottomSheetClassApp);
