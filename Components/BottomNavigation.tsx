import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import {Home} from '../View/Home.tsx';
import {Favorites} from '../View/Favorites';

type Route = {
  key: string;
  title: string;
  focusedIcon: string;
  unfocusedIcon?: string;
};

const BottomMenu: React.FC = () => {
  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState<Route[]>([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {
      key: 'favorites',
      title: 'Favorites',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    favorites: Favorites,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomMenu;
