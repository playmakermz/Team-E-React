import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, StackActions } from '@react-navigation/native';
import { MovieItemProps } from 'src/types/app';
import { IMAGE_BASE_URL } from '@env';

const MovieItem = ({ movie, size, coverType }: MovieItemProps): JSX.Element => {
  const navigation = useNavigation();
  const pushAction = StackActions.push('MovieDetail', { id: movie.id });
  
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(pushAction);
      }}
      style={[styles.container, size]}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        source={{
          uri: IMAGE_BASE_URL + `${
            coverType === 'backdrop' ? movie.backdrop_path : movie.poster_path
          }`,
        }}
      >
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}
        >
          <Text numberOfLines={2} style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
  },
  backgroundImageStyle: {
    borderRadius: 8,
  },
  gradientStyle: {
    ...StyleSheet.absoluteFillObject,
    padding: 8,
    justifyContent: 'flex-end',
    borderRadius: 8,
  },
  movieTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: 'yellow',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default MovieItem;
