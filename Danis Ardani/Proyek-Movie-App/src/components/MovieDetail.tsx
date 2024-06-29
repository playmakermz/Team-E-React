import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import HttpClient from "src/utils/HttpClient";
import MovieItem from "./MovieItem";
import { setData, getData } from "../utils/utility";
import { IMAGE_BASE_URL } from "@env";
import { Movie } from "src/types/app";

const MovieDetail = ({ route, navigation }: any): JSX.Element => {
  const { id } = route.params;
  const [movieDetail, setMovieDetail] = useState<any>({});
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const getMovieDetail = async (): Promise<void> => {
    try {
      const response = await HttpClient.get(`/movie/${id}`);
      setMovieDetail(response.data);
    } catch (error) {
      console.error("Error fetching movie detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMovieRecommendations = async (): Promise<void> => {
    try {
      const response = await HttpClient.get(`/movie/${id}/recommendations`);
      setRecommendations(response.data.results);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    getMovieDetail();
    getMovieRecommendations();
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const favorites = (await getData("favorites")) as Movie[];
      if (favorites) {
        const isFav = favorites.some((fav) => fav.id === id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error("Error checking if favorite:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      let favorites = ((await getData("favorites")) as Movie[]) || [];
      if (isFavorite) {
        favorites = favorites.filter((fav: any) => fav.id !== id);
        setIsFavorite(false);
      } else {
        favorites.push(movieDetail);
        setIsFavorite(true);
      }

      await setData("favorites", favorites);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const openHomepage = () => {
    if (movieDetail.homepage) {
      Linking.openURL(movieDetail.homepage);
    }
  };

  const openIMDb = () => {
    if (movieDetail.imdb_id) {
      const imdbUrl = `https://www.imdb.com/title/${movieDetail.imdb_id}/`;
      Linking.openURL(imdbUrl)
        .then((supported) => {
          if (!supported) {
            console.log(`Can't handle url: ${imdbUrl}`);
          }
        })
        .catch((err) => console.error("An error occurred", err));
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!movieDetail.title) {
    return (
      <View style={styles.container}>
        <Text>Error loading movie details.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image
        source={{
          uri: IMAGE_BASE_URL + movieDetail.poster_path,
        }}
        style={styles.moviePoster}
        resizeMode="cover"
      />
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <FontAwesome
          name={isFavorite ? "heart" : "heart-o"}
          size={24}
          color={isFavorite ? "#F44336" : "white"}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text style={styles.movieTitle}>{movieDetail.title}</Text>
        {movieDetail.tagline && (
          <Text style={styles.tagline}>{movieDetail.tagline}</Text>
        )}
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.movieOverview}>{movieDetail.overview}</Text>
        <Text style={styles.sectionTitle}>
          <FontAwesome name="info-circle" size={20} color="#333" /> Details
        </Text>
        <Text style={styles.movieDetails}>
          <FontAwesome name="star" size={16} color="#FFD700" />{" "}
          {movieDetail.vote_average} ({movieDetail.vote_count} votes)
        </Text>
        <Text style={styles.movieDetails}>
          <FontAwesome name="calendar" size={16} color="#333" /> Release Date:{" "}
          {movieDetail.release_date}
        </Text>
        <Text style={styles.movieDetails}>
          <FontAwesome name="clock-o" size={16} color="#333" /> Runtime:{" "}
          {movieDetail.runtime} minutes
        </Text>
        <Text style={styles.movieDetails}>
          <FontAwesome name="fire" size={16} color="#FF6347" /> Popularity:{" "}
          {movieDetail.popularity}
        </Text>
        <Text style={styles.movieDetails}>
          <FontAwesome name="language" size={16} color="#333" /> Original
          Language: {movieDetail.original_language}
        </Text>
        <Text style={styles.movieDetails}>
          <FontAwesome name="money" size={16} color="#333" /> Budget: $
          {movieDetail.budget.toLocaleString()}
        </Text>
        <Text style={styles.movieDetails}>
          <FontAwesome name="money" size={16} color="#333" /> Revenue: $
          {movieDetail.revenue.toLocaleString()}
        </Text>
        <Text style={styles.movieDetails}>
          <FontAwesome name="tag" size={16} color="#333" /> Genres:{" "}
          {movieDetail.genres.map((genre: any) => genre.name).join(", ")}
        </Text>
        <Text style={styles.movieDetails}>
          <FontAwesome name="check" size={16} color="#333" /> Status:{" "}
          {movieDetail.status}
        </Text>
        <Text style={styles.movieDetails}>
  <FontAwesome name="language" size={16} color="#333" /> Spoken Languages:{" "}
  {movieDetail.spoken_languages.map((lang: any) => lang.english_name).join(", ")}
</Text>

        <Text style={styles.sectionTitle}>
          <FontAwesome name="industry" size={20} color="#333" /> Production
          Companies
        </Text>
        <View style={styles.productionCompaniesContainer}>
          {movieDetail.production_companies.map((company: any) => (
            <View key={company.id} style={styles.companyItem}>
              <Image
                source={{
                  uri: IMAGE_BASE_URL + company.logo_path,
                }}
                style={styles.companyLogo}
                resizeMode="contain"
              />
              <Text style={styles.companyName}>{company.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>
          <FontAwesome name="film" size={20} color="#333" /> Belongs to
          Collection
        </Text>
        {movieDetail.belongs_to_collection && (
          <View style={styles.collectionContainer}>
            <Image
              source={{
                uri:
                  IMAGE_BASE_URL +
                  movieDetail.belongs_to_collection.poster_path,
              }}
              style={styles.collectionPoster}
              resizeMode="cover"
            />
            <Text style={styles.collectionName}>
              {movieDetail.belongs_to_collection.name}
            </Text>
          </View>
        )}
        <Text style={styles.sectionTitle}>
          <FontAwesome name="info-circle" size={20} color="#333" /> Additional
          Information
        </Text>
        <View style={styles.additionalInfoContainer}>
          <View style={styles.additionalInfoRow}>
            <Text style={styles.additionalInfoTitle}>Homepage:</Text>
            {movieDetail.homepage ? (
              <TouchableOpacity onPress={openHomepage}>
                <FontAwesome name="external-link" size={16} color="#0645AD" />
              </TouchableOpacity>
            ) : (
              <Text>N/A</Text>
            )}
          </View>
          <View style={styles.additionalInfoRow}>
            <Text style={styles.additionalInfoTitle}>IMDb:</Text>
            {movieDetail.imdb_id ? (
              <TouchableOpacity onPress={openIMDb}>
                <FontAwesome name="imdb" size={16} color="#0645AD" />
              </TouchableOpacity>
            ) : (
              <Text>N/A</Text>
            )}
          </View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>
        <FontAwesome name="thumbs-up" size={20} color="#333" /> Recommendations
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recommendations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.push("MovieDetail", { id: item.id })}
          >
            <MovieItem
              movie={item}
              size={coverImageSize.poster}
              coverType="poster"
            />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 24,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  moviePoster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  favoriteIcon: {
    color: "white",
  },
  detailsContainer: {
    marginTop: 16,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 12,
    textAlign: "center",
  },
  movieOverview: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: "justify",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
  },
  movieDetails: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "justify",
  },
  collectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  collectionPoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  collectionName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  additionalInfoContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  additionalInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  additionalInfoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  additionalInfoLink: {
    fontSize: 16,
    color: "#0645AD",
    textDecorationLine: "underline",
  },
  productionCompaniesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    marginBottom: 12,
    justifyContent: "center",
  },
  companyItem: {
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  companyLogo: {
    width: 80,
    height: 40,
    marginBottom: 5,
  },
  companyName: {
    textAlign: "center",
    fontSize: 14,
  },
});

export default MovieDetail;
