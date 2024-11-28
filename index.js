/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {store, persistor} from './Redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const Main = () => (
  <Provider store={store}>
    <PaperProvider>
      <NativeBaseProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </NativeBaseProvider>
    </PaperProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Main);
