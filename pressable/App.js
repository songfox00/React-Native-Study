import React, {useState} from 'react';
import {View, Text, Switch, useColorScheme} from 'react-native';
import {
  useTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Press from './src/Press';
import Router from './src/Router';
import MapFunction from './src/MapFunction';
import AppContainer from './src/index';

const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1A1A1A',
    accent: '#FAFAFA',
  },
};

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FAFAFA',
    accent: '#1A1A1A',
  },
};

const Stack = createStackNavigator();

export default App = () => {
  const scheme = useColorScheme();
  return (
    <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <NavigationContainer>
        <AppContainer />
        {/* <Stack.Navigator>
          <Stack.Screen name="Router" component={Router} />
          <Stack.Screen name="Press" component={Press} />
          <Stack.Screen name="Map" component={MapFunction} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </PaperProvider>
  );
};
