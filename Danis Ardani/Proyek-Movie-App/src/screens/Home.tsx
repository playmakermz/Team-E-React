import React from "react";
import { ScrollView, View, StatusBar, StyleSheet } from "react-native";
import type { MovieListProps } from "../types/app";
import MovieList from "../components/MovieList";

const movieLists: MovieListProps[] = [
  {
    title: "Now Playing in Theater",
    path: "movie/now_playing",
    coverType: "backdrop",
  },
  {
    title: "Upcoming Movies",
    path: "movie/upcoming",
    coverType: "poster",
  },
  {
    title: "Top Rated Movies",
    path: "movie/top_rated",
    coverType: "poster",
  },
  {
    title: "Popular Movies",
    path: "movie/popular",
    coverType: "poster",
  },
];

const Home = (): JSX.Element => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {movieLists.map((movieList) => (
          <MovieList
            title={movieList.title}
            path={movieList.path}
            coverType={movieList.coverType}
            key={movieList.title}
          />
        ))}
        <StatusBar translucent={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default Home;
