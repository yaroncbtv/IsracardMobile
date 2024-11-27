/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';

const Main = () => (
    <PaperProvider>
      <NativeBaseProvider>
        <App />
      </NativeBaseProvider>
    </PaperProvider>
  );

AppRegistry.registerComponent(appName, () => Main);