import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HttpClient from "../utils/HttpClient";
import MovieItem from "src/components/MovieItem";
import { Movie, Genre } from "../types/app";

const Search = (): JSX.Element => {
  const [isKeywordSearch, setIsKeywordSearch] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string>("");

  const getGenres = async (): Promise<void> => {
    try {
      const response = await HttpClient.get("/genre/movie/list", {
        params: { language: "en" },
      });
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  const searchMovies = async (): Promise<void> => {
    if (
      (isKeywordSearch && !keyword.trim()) ||
      (!isKeywordSearch && !selectedGenre)
    ) {
      setValidationMessage("Please enter a keyword or select a category");
      return;
    }

    setValidationMessage("");
    setLoading(true);
    setSearchAttempted(true);

    try {
      const query = isKeywordSearch ? "/search/movie" : "/discover/movie";
      const response = await HttpClient.get(query, {
        params: isKeywordSearch
          ? { query: keyword }
          : { with_genres: selectedGenre!.id },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMovies = (movies: Movie[]): JSX.Element => {
    const { width: screenWidth } = Dimensions.get("window");
    const numColumns = 4;
    const itemWidth = screenWidth / numColumns - 20;
    const itemSpacing = 10;

    return (
      <View style={styles.sectionContainer}>
        <FlatList
          style={styles.movieList}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                /* Handle movie item press */
              }}
              style={styles.movieItemContainer}
            >
              <MovieItem
                movie={item}
                size={{ width: itemWidth, height: itemWidth * 1.5 }}
                coverType="poster"
                style={styles.movieItem}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.movieListContainer}
        />
      </View>
    );
  };

  useEffect(() => {
    if (selectedGenre && !isKeywordSearch) {
      searchMovies();
    }
  }, [selectedGenre, isKeywordSearch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.switchButton,
              isKeywordSearch && styles.activeButton,
            ]}
            onPress={() => {
              setIsKeywordSearch(true);
              setKeyword("");
              setSelectedGenre(null);
            }}
          >
            <Text style={styles.switchButtonText}>Search by Keyword</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchButton,
              !isKeywordSearch && styles.activeButton,
            ]}
            onPress={() => {
              setIsKeywordSearch(false);
              setKeyword("");
            }}
          >
            <Text style={styles.switchButtonText}>Search by Category</Text>
          </TouchableOpacity>
        </View>
        {isKeywordSearch ? (
          <View style={styles.searchInputContainer}>
            <TextInput
              placeholder="Enter keyword"
              value={keyword}
              onChangeText={setKeyword}
              style={[styles.input, { marginRight: 0 }]}
            />
            <TouchableOpacity onPress={searchMovies} style={styles.searchButton}>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.categoryContainer}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                style={[
                  styles.categoryButton,
                  selectedGenre &&
                    selectedGenre.id === genre.id &&
                    styles.activeGenreButton,
                ]}
                onPress={() => {
                  setKeyword(genre.name);
                  setSelectedGenre(genre);
                }}
              >
                <Text style={styles.categoryText}>{genre.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {validationMessage ? (
          <Text style={styles.validationMessage}>{validationMessage}</Text>
        ) : null}
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          {searchAttempted && movies.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          ) : (
            renderMovies(movies)
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
  switchButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeButton: {
    backgroundColor: "lightblue",
  },
  switchButtonText: {
    fontSize: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: "blue",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  activeGenreButton: {
    backgroundColor: "lightblue",
  },
  categoryText: {
    fontSize: 14,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
  },
  movieItemContainer: {
    marginHorizontal: 4,
    marginBottom: 10,
  },
  movieItem: {
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: "#888",
  },
  validationMessage: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Search;
