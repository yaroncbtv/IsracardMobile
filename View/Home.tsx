import React, {useEffect} from 'react';
import CardComponent from '../Components/Card'; // Adjust path as necessary
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useAppSelector, useAppDispatch} from '../Redux/hooks';
import {Book} from '../Interface/Book';
import {Searchbar} from 'react-native-paper';
import {useDebounce} from 'use-debounce';
import {View, Text} from 'react-native';
import {Menu, Button, Divider, Provider} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';

export const Home: React.FC = () => {
  const booksList = useAppSelector(state => state.appSlice.booksList);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useDebounce('', 500);
  const [filteredItems, setFilteredItems] = React.useState<Book[]>(booksList);

  const [items, setItems] = React.useState([
    {id: 1, name: 'a-z'},
    {id: 2, name: 'Number Pages'},
    {id: 3, name: 'Release Date'},
  ]);

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
  const handleSearchSort = (id: number) => {
    switch (id) {
      case 1:
        {
          const sortedItems = [...booksList].sort((a, b) =>
            a.title.localeCompare(b.title),
          );
          setFilteredItems(sortedItems);
        }
        break;
      case 2:
        {
          const sortedItems = booksList.sort((a, b) => a.pages - b.pages);
          setFilteredItems(sortedItems);
        }
        break;
      case 3:
        {
          const sortedItems = booksList.sort(
            (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate),
          );
          setFilteredItems(sortedItems);
        }
        break;
      default:
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
        <View style={{padding: 20}}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Sort By</Button>}>
            {items?.map(item => (
              <Menu.Item
                key={item.id}
                title={item.name}
                onPress={() => handleSearchSort(item.id)}
              />
            ))}
            <Divider />
            <Menu.Item title="Close" onPress={closeMenu} />
          </Menu>
        </View>
        <FlashList
          data={filteredItems}
          keyExtractor={item => item?.number?.toString()}
          estimatedItemSize={200}
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
