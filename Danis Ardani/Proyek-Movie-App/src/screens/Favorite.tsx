import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import MovieItem from "src/components/MovieItem";
import { getData } from "../utils/utility";
import { Movie } from "../types/app";

interface FavoriteProps {}

const { width: screenWidth } = Dimensions.get("window");
const numColumns = 4;
const itemWidth = screenWidth / numColumns - 20;
const itemSpacing = 10;

const Favorite: React.FC<FavoriteProps> = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const getFavorites = async () => {
    try {
      const storedFavorites = await getData<Movie[]>("favorites");
      if (storedFavorites) {
        setFavorites(storedFavorites);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getFavorites();
    }, [])
  );

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.itemContainer}>
      <MovieItem
        movie={item}
        size={{
          width: itemWidth,
          height: itemWidth * 1.5,
        }}
        coverType={"poster"}
        style={styles.item}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No favorites saved.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
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
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginHorizontal: itemSpacing / 2,
    marginBottom: itemSpacing,
  },
  item: {
    borderRadius: 8,
  },
});

export default Favorite;
