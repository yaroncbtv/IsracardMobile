/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import {store} from './Redux/store'; // Path to your store file
import { Provider } from 'react-redux';

const Main = () => (

  <Provider store={store}>
    <PaperProvider>
      <NativeBaseProvider>
          <App />
      </NativeBaseProvider>
    </PaperProvider>
  </Provider>
  );

AppRegistry.registerComponent(appName, () => Main);
