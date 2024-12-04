import {useAppSelector} from '../Redux/hooks';
import CardComponent from '../Components/Card';
import React, {useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import {Book} from '../Interface/Book';
import {useDebounce} from 'use-debounce';
import {FlashList} from '@shopify/flash-list';

export const Favorites: React.FC = () => {
  const bookFavoritesList = useAppSelector(
    state => state.appSlice.bookFavoritesList,
  );

  const [searchQuery, setSearchQuery] = useDebounce('', 500);
  const [filteredItems, setFilteredItems] =
    React.useState<Book[]>(bookFavoritesList);

  useEffect(() => {
    setFilteredItems(bookFavoritesList);
  }, [bookFavoritesList]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredItems(bookFavoritesList);
    } else {
      const filtered = bookFavoritesList.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  };
  if (bookFavoritesList.length > 0) {
    return (
      <>
        <Searchbar
          style={{margin: 10}}
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <FlashList
          data={filteredItems}
          keyExtractor={item => item?.index?.toString()}
          estimatedItemSize={200}
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
      </>
    );
  }
};
