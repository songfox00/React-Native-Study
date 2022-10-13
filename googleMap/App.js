import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './src/Navigation';

class App extends PureComponent {
  render() {
    return (
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    );
  }
}

export default App;
