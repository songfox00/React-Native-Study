import React from 'react';
import CounterListContainer from './containers/CounterListContainer';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import configureStore from './store';

// const store = createStore(reducers);
const {store, persistor} = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CounterListContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
