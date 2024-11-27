import {getApi} from '../Api/apiService';
import React, {useEffect} from 'react';
import CardComponent from '../Components/Card'; // Adjust path as necessary
import {FlatList} from 'native-base';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

interface Book {
  number: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  pages: number;
  cover: string;
  index: number;
}

export const Home: React.FC = () => {
  const [books, setBooks] = React.useState<Book[]>();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getApi<Book[]>(
      'https://potterapi-fedeperin.vercel.app/en/books',
    );
    setBooks(res);
  };
  if (books) {
    return (
      <FlatList
        data={books}
        keyExtractor={item => item.number.toString()}
        renderItem={({item}) => (
          <CardComponent
            title={item.title}
            content={`Release Date: ${item.releaseDate}`}
            imageUri={item.cover}
          />
        )}
      />
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
