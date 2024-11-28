import {useAppSelector} from '../Redux/hooks';
import {FlatList} from 'native-base';
import CardComponent from '../Components/Card';
import React from 'react';

export const Favorites: React.FC = () => {
  const bookFavoritesList = useAppSelector(
    state => state.appSlice.bookFavoritesList,
  );
  if (bookFavoritesList.length > 0) {
    return (
      <FlatList
        data={bookFavoritesList}
        keyExtractor={item => item?.index?.toString()}
        renderItem={({item}) => (
          <CardComponent
            title={item.title}
            releaseDate={`Release Date: ${item.releaseDate}`}
            cover={item.cover}
            description={item.description}
            pages={item.pages}
            index={item.index}
            isDeleteBtn={true}
          />
        )}
      />
    );
  }
};
