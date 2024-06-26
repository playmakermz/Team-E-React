import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  View, Text, TextInput, Button, ScrollView, Image, 
  TouchableOpacity, StyleSheet, FlatList 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';

const API_KEY = '43777aded21f34139b7ebd1a2c7a7b4f';
const BASE_URL = 'https://api.themoviedb.org/3';

// Membuat navigator menggunakan React Navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Membuat context untuk menyimpan data favorit
const FavoritesContext = createContext();

// Komponen untuk halaman utama dengan daftar film
const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState({ nowPlaying: [], upcoming: [], topRated: [], popular: [] });

  // Mengambil data film dari API ketika komponen dimount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const nowPlaying = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
        const upcoming = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
        const topRated = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
        const popular = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        setMovies({
          nowPlaying: nowPlaying.data.results,
          upcoming: upcoming.data.results,
          topRated: topRated.data.results,
          popular: popular.data.results,
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Fungsi untuk merender daftar film dalam FlatList
  const renderMovies = (movies, title, largePoster) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}>
            <View style={[styles.movieCard, largePoster && styles.movieCardLarge]}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={[styles.moviePoster, largePoster && styles.moviePosterLarge]}
                resizeMode="cover"
              />
                
              <View>
              <Text style={[styles.movieTitle, largePoster && styles.movieTitleLarge]}>{item.title}</Text>
              </View>
              <View style={[styles.ratingContainer]}>
                {/* <Icon name="star" size={18} color="gold" style={styles.ratingIcon} /> */}
                {/* ieu */}
                <AntDesign name="star" size={18} color="gold"  />
                <Text style={[styles.ratingText, {marginLeft:5}]}>{item.vote_average} ({item.vote_count} votes)</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderMovies(movies.nowPlaying, 'Now Playing', true)}
      {renderMovies(movies.upcoming, 'Upcoming')}
      {renderMovies(movies.topRated, 'Top Rated')}
      {renderMovies(movies.popular, 'Popular')}
    </ScrollView>
  );
};

// Komponen untuk halaman pencarian film
const SearchScreen = ({ navigation }) => {
  const [isKeywordSearch, setIsKeywordSearch] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState([]);

  // Daftar kategori genre film
  const categories = [
    { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' }, 
    { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' }, 
    { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' }, 
    { id: 36, name: 'History' }, { id: 27, name: 'Horror' }, { id: 10402, name: 'Music' }, 
    { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Science Fiction' }, 
    { id: 53, name: 'Thriller' }, { id: 10752, name: 'War' }, { id: 37, name: 'Western' }
  ];

  // Fungsi untuk melakukan pencarian film berdasarkan kata kunci atau kategori genre
  const searchMovies = async () => {
    try {
      const query = isKeywordSearch
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${keyword}`
        : `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${keyword}`;

      const response = await axios.get(query);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  // Fungsi untuk merender hasil pencarian film dalam FlatList
  const renderMovies = (movies, title) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}>
            <View style={styles.movieCard}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.moviePoster}
                resizeMode="cover"
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
              <View style={styles.ratingContainer}>
                {/* <Icon name="star" size={18} color="gold" style={styles.ratingIcon} /> */}
                <AntDesign name="star" size={18} color="gold"  />
                <Text style={styles.ratingText}>{item.vote_average} ({item.vote_count} votes)</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.buttonContainer}>
          {/* Tombol untuk mengganti mode pencarian */}
          <TouchableOpacity
            style={[styles.switchButton, isKeywordSearch && styles.activeButton]}
            onPress={() => setIsKeywordSearch(true)}
          >
            <Text style={styles.switchButtonText}>Search by Keyword</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchButton, !isKeywordSearch && styles.activeButton]}
            onPress={() => setIsKeywordSearch(false)}
          >
            <Text style={styles.switchButtonText}>Search by Category</Text>
          </TouchableOpacity>
        </View>
        {/* Input pencarian berdasarkan kata kunci atau kategori genre */}
        {isKeywordSearch ? (
          <View style={styles.searchInputContainer}>
            <TextInput
              placeholder="Enter keyword"
              value={keyword}
              onChangeText={setKeyword}
              style={styles.input}
            />
            <Button title="Search" onPress={searchMovies} />
          </View>
        ) : (
          <View style={styles.categoryContainer}>
            {/* Tombol kategori genre film */}
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryButton}
                onPress={() => {
                  setKeyword(category.id.toString());
                  searchMovies();
                }}
              >
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      {renderMovies(movies, 'Results')}
    </ScrollView>
  );
};

// Komponen untuk halaman daftar film favorit
const FavoriteScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);

  // Fungsi untuk merender daftar film favorit dalam FlatList
  const renderFavorites = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
      style={[styles.container2, {marginVertical: 10}]}
    >
      <View style={styles.movieCard}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.moviePoster}
          resizeMode="cover"
        />
        <Text style={styles.movieTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {/* <Icon name="star" size={18} color="gold" style={styles.ratingIcon} /> */}
          <AntDesign name="star" size={18} color="gold"  />
          <Text style={styles.ratingText}>{item.vote_average} ({item.vote_count} votes)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={favorites}
      renderItem={renderFavorites}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

// Komponen untuk halaman detail film
const MovieDetailScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const { favorites, setFavorites } = useContext(FavoritesContext);

  // Mengecek apakah film sudah ada di daftar favorit
  const isFavorite = favorites.some(fav => fav.id === movieId);

  // Mengambil detail film dan rekomendasi film terkait dari API
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        setMovie(response.data);

        const recommendationsResponse = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
        setRecommendations(recommendationsResponse.data.results);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Fungsi untuk menambah atau menghapus film dari daftar favorit
  const toggleFavorite = async () => {
    try {
      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = favorites.filter(fav => fav.id !== movieId);
      } else {
        updatedFavorites = [...favorites, movie];
      }
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  // Menampilkan informasi film dan daftar rekomendasi dalam ScrollView
  if (!movie) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.moviePosterLarge}
        resizeMode="cover"
      />
      <TouchableOpacity onPress={toggleFavorite} style={{ marginHorizontal: "auto", marginVertical: 10 }}>
        {/* <Icon
          name={isFavorite ? "heart" : "heart-outline"}
          size={30}
          color="red"
          style={styles.favoriteIcon}
        /> */}
        {isFavorite ? (<Entypo name="heart" size={24} color="red" />):(<Entypo name="heart-outlined" size={24} color="red" />)}
        
        
      </TouchableOpacity>
      <Text style={styles.movieDetails}>Title: {movie.title}</Text>
      <Text style={styles.movieDetails}>Rating: {movie.vote_average} ({movie.vote_count} votes)</Text>
      <Text style={styles.movieDetails}>Release Date: {movie.release_date}</Text>
      <Text style={styles.movieDetails}>Popularity: {movie.popularity}</Text>
      <Text style={styles.movieDetails}>Vote Count: {movie.vote_count}</Text>
      <Text style={styles.movieDetails}>Language: {movie.original_language}</Text>
      <Text style={styles.movieDetails}>Overview: {movie.overview}</Text>
      <Text style={styles.sectionTitle}>Recommendations</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recommendations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
          >
            <View style={styles.movieCard}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.moviePoster}
                resizeMode="cover"
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
              <View style={styles.ratingContainer}>
                {/* <Icon name="star" size={18} color="gold" style={styles.ratingIcon} /> */}
                <AntDesign name="star" size={18} color="gold"  />
                <Text style={styles.ratingText}>{item.vote_average} ({item.vote_count} votes)</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

// Komponen untuk stack navigator halaman Home
const HomeStackScreen = () => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: ' ' }} />
    <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Detail' }} />
  </Stack.Navigator>
);

// Komponen untuk stack navigator halaman Search
const SearchStackScreen = () => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }}>
    <Stack.Screen name="Search" component={SearchScreen} options={{ title: '' }} />
    <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Detail' }} />
  </Stack.Navigator>
);

// Komponen utama aplikasi
const App = () => {
  const [favorites, setFavorites] = useState([]);

  // Mengambil daftar film favorit dari AsyncStorage saat komponen dimount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesJson = await AsyncStorage.getItem('favorites');
        if (favoritesJson) {
          const favoritesData = JSON.parse(favoritesJson);
          setFavorites(favoritesData);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  // Menggunakan context untuk menyediakan data favorit ke dalam navigasi
  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#f4511e',
            inactiveTintColor: 'gray',
            labelStyle: {
              fontSize: 12,
            },
            style: {
              backgroundColor: '#fff',
            },
          }}>
          {/* Tab untuk halaman Home */}
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                // <Icon name="home" color={color} size={size} />
                <FontAwesome name="home" size={20} color="black" />
              ),
            }}
          />
          {/* Tab untuk halaman Search */}
          <Tab.Screen
            name="Search"
            component={SearchStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                // <Icon name="search" color={color} size={size} />
                <FontAwesome name="search" size={20} color="black" />
              ),
            }}
          />
          {/* Tab untuk halaman Favorites */}
          <Tab.Screen
            name="Favorites"
            component={FavoriteScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                // <Icon name="heart" color={color} size={size} />
                <Feather name="star" size={20} color="black" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
};

// Stylesheet untuk styling komponen-komponen
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  container2: {
    marginHorizontal: 10,
    alignItems: "center"
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  movieCard: {
    marginHorizontal: 10,
    marginBottom: 10,
    width: 150,
    borderWidth: 1,
    borderColor: '#e6e8e6',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    height: "100%",
  },  

  movieCardLarge: {
    width: 250,
    height: 400,
  },
  moviePoster: {
    width: '100%',
    height: 200,
  },
  moviePosterLarge: {
    width: '100%',
    height: 300,
  },
  movieTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  movieTitleLarge: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontSize: 16,
  },
  favoriteIcon: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  searchContainer: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '80%',
  },
  movieDetails: {
    marginVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#f4511e',
    borderRadius: 5,
    width: 100,
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  switchButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#f4511e',
  },
  switchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "auto",
    paddingBottom: 10
  },
  ratingIcon: {
    marginRight: 5,
  },
  ratingText: {
    fontSize: 12,
  },
});

export default App;
