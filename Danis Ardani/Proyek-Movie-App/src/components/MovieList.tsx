import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import HttpClient from 'src/utils/HttpClient'; 
import type { MovieListProps, Movie } from '../types/app';
import MovieItem from './MovieItem';
import { StackActions, useNavigation } from '@react-navigation/native'; 

const MovieList = ({ title, path, coverType }: MovieListProps): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async (): Promise<void> => {
    try {
      const response = await HttpClient.get(`/${path}`);
      setMovies(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setIsLoading(false);
    }
  };

    const pushAction = StackActions.push('AllMovies', { title, path });;

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.header}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.title}>{title}</Text>

        </View>
        <TouchableOpacity onPress={() => {
        navigation.dispatch(pushAction);
      }}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          style={{
            ...styles.movieList,
            maxHeight: coverImageSize[coverType].height,
          }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          horizontal
          data={movies}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={coverImageSize[coverType]}
              coverType={coverType}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
};

const styles = StyleSheet.create({
  header: {
    marginLeft: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8978A4',
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  seeAll: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieList;
