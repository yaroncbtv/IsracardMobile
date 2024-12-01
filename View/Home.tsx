import {getApi} from '../Api/apiService';
import React, {useEffect} from 'react';
import CardComponent from '../Components/Card'; // Adjust path as necessary
import {FlatList} from 'native-base';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useAppSelector, useAppDispatch} from '../Redux/hooks';
import {Book} from '../Interface/Book';
import {Searchbar} from 'react-native-paper';

export const Home: React.FC = () => {
  const booksList = useAppSelector(state => state.appSlice.booksList);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState<Book[]>(booksList);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFilteredItems(booksList);
  }, [booksList]);

  const getData = async () => {
    if (booksList.length === 0) {
      dispatch({type: 'books/fetchBooks'});
      setFilteredItems(booksList);
    }
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
              isSave={item.isSave}
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
