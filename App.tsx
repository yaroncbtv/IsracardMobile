import React from 'react';
import BottomMenu from './Components/BottomNavigation';
import {BooksDetails} from './View/BookDetails';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BooksApp"
        screenOptions={{
          headerShown: true, // Show/hide header
        }}>
        <Stack.Screen name="BooksApp" component={BottomMenu} />
        <Stack.Screen name="BookDetails" component={BooksDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
