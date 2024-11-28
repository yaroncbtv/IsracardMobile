import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppDispatch} from '../Redux/hooks';
import {saveBookToFavoritesList} from '../Redux/appSlice';
import {Book} from '../Interface/Book';

export const BooksDetails: React.FC = ({route}: any) => {
  const {title, releaseDate, cover, description, pages, index} = route.params;
  const dispatch = useAppDispatch();

  const handlePress = () => {
    const book: Book = {
      title,
      releaseDate,
      cover,
      description,
      pages,
      index,
    };
    dispatch(saveBookToFavoritesList(book));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.field]}>Title:</Text>
        <Text style={styles.cell}>{title}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.cell, styles.field]}>ReleaseDate:</Text>
        <Text style={styles.cell}>{releaseDate}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.cell, styles.field]}>Cover:</Text>
        <Text style={styles.cell}>{cover}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.cell, styles.field]}>Description:</Text>
        <Text style={styles.cell}>{description}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.cell, styles.field]}>Pages:</Text>
        <Text style={styles.cell}>{pages}</Text>
      </View>
      <Button onPress={handlePress}>Save To Favorites</Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  field: {
    fontWeight: 'bold',
    flex: 0.5, // Adjust field width
  },
});
