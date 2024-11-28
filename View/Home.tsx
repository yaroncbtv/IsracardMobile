import {getApi} from '../Api/apiService';
import React, {useEffect} from 'react';
import CardComponent from '../Components/Card'; // Adjust path as necessary
import {FlatList} from 'native-base';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useAppSelector, useAppDispatch} from '../Redux/hooks';
import {addBookToList} from '../Redux/appSlice';
import {Book} from '../Interface/Book';
import {Searchbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveAllBooksToFavoritesList} from '../Redux/appSlice';

export const Home: React.FC = () => {
  const booksList = useAppSelector(state => state.appSlice.booksList);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState<Book[]>(booksList);

  useEffect(() => {
    getData();
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('books');
      if (savedItems) {
        dispatch(saveAllBooksToFavoritesList(JSON.parse(savedItems)));
      }
    } catch (error) {
      console.error('Error loading items from AsyncStorage', error);
    }
  };

  React.useEffect(() => {
    loadItems();
  }, []);
  const getData = async () => {
    const res = await getApi<Book[]>(
      'https://potterapi-fedeperin.vercel.app/en/books',
    );
    dispatch(addBookToList(res));
    setFilteredItems(res);
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredItems(booksList);
    } else {
      const filtered = booksList.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  };
  if (booksList) {
    return (
      <>
        <Searchbar
          style={{margin: 10}}
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <FlatList
          data={filteredItems}
          keyExtractor={item => item?.number?.toString()}
          renderItem={({item}) => (
            <CardComponent
              title={item.title}
              releaseDate={`Release Date: ${item.releaseDate}`}
              cover={item.cover}
              description={item.description}
              pages={item.pages}
              index={item.index}
              isDeleteBtn={false}
            />
          )}
        />
      </>
    );
  }
  return (
    <ActivityIndicator
      size={'large'}
      animating={true}
      color={MD2Colors.red800}
    />
  );
};
