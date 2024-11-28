import * as React from 'react';
import {Button, Card, Text, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../Redux/hooks';
import {
  saveBookToFavoritesList,
  removeBookFromFavoritesList,
} from '../Redux/appSlice';
import {Book} from '../Interface/Book';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardComponent: React.FC<Book> = ({
  title,
  cover,
  releaseDate,
  description,
  pages,
  index,
  isDeleteBtn,
}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const bookFavoritesList = useAppSelector(
    state => state.appSlice.bookFavoritesList,
  );
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [items, setItems] = React.useState<Book[]>(bookFavoritesList);

  const handlePress = () => {
    navigation.navigate('BookDetails', {
      title: title,
      cover: cover,
      releaseDate: releaseDate,
      description: description,
      pages: pages,
      index: index,
    });
  };
  const handleSavePress = async () => {
    const book: Book = {
      title,
      releaseDate,
      cover,
      description,
      pages,
      index,
    };
    setItems(prevItems => [...prevItems, book]);
    dispatch(saveBookToFavoritesList(book));
    onToggleSnackBar();
  };
  const saveItems = async () => {
    try {
      await AsyncStorage.setItem('books', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items to AsyncStorage', error);
    }
  };
  React.useEffect(() => {
    saveItems();
  }, [items]);

  const deleteItems = async () => {
    try {
      const filterItems = items.filter(item => item.index !== index);
      setItems(filterItems);
      await AsyncStorage.setItem('books', JSON.stringify(filterItems));
    } catch (error) {
      console.error('Error saving items to AsyncStorage', error);
    }
  };

  const handleDeleatePress = async () => {
    const book: Book = {
      title,
      releaseDate,
      cover,
      description,
      pages,
      index,
    };
    dispatch(removeBookFromFavoritesList(book));
    deleteItems();
  };
  return (
    <>
      <Card style={{margin: 10}}>
        <Card.Content>
          <Text>
            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: 'Undo',
                onPress: () => {
                  // Do something
                },
              }}>
              Favorites is update!
            </Snackbar>
          </Text>
          <Text variant="titleLarge">{title}</Text>
          <Text variant="bodyMedium">{releaseDate}</Text>
        </Card.Content>
        <Card.Cover source={{uri: cover}} />
        <Card.Actions>
          <Button onPress={handlePress}>More Details</Button>
          <Button onPress={isDeleteBtn ? handleDeleatePress : handleSavePress}>
            {isDeleteBtn ? 'Delete' : 'Save'}
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
};

export default CardComponent;
