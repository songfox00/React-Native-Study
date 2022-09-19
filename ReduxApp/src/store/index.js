import {createStore} from 'redux';
import rootReducer from '../reducers';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {AsyncStorage} from 'react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore = () => {
  let store = createStore(enhancedReducer);
  let persistor = persistStore(store);
  return {store, persistor};
};
