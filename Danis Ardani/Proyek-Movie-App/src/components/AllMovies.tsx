import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import HttpClient from 'src/utils/HttpClient';
import { useRoute } from '@react-navigation/native';
import MovieItem from '../components/MovieItem';
import { Movie } from '../types/app';

const { width: screenWidth } = Dimensions.get('window');
const numColumns = 4;
const itemWidth = screenWidth / numColumns - 20;
const itemSpacing = 10;
const PAGE_SIZE = 20;

const AllMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const route = useRoute();

 
  const { title, path } = route.params as { title: string; path: string };

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await HttpClient.get(`/${path}`, {
        params: {
          page: page.toString(),
         
        },
      });
      const newMovies = response.data.results;

     
      if (page === 1) {
        setMovies(newMovies);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all movies:', error);
      setLoading(false);
    }
  };

  const loadMoreMovies = async (): Promise<void> => {
    if (loadingMore) {
      return;
    }

    try {
      setLoadingMore(true);
      const response = await HttpClient.get(`/${path}`, {
        params: {
          page: (page + 1).toString(),
         
        },
      });
      const newMovies = response.data.results;

     
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
      setLoadingMore(false);
    } catch (error) {
      console.error('Error fetching more movies:', error);
      setLoadingMore(false);
    }
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.itemContainer}>
      <MovieItem
        movie={item}
        size={{
          width: itemWidth,
          height: itemWidth * 1.5,
        }}
        coverType="poster"
        style={styles.item}
      />
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingMoreContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  loadingMoreContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemContainer: {
    marginHorizontal: itemSpacing / 2,
    marginBottom: itemSpacing,
  },
  item: {
    borderRadius: 8,
  },
});

export default AllMovies;
