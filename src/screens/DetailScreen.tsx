/* eslint-disable react-native/no-inline-styles */
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
// import { Movie } from '../interfaces/movieInterface';
import {RootStackParams} from '../navigation/Navigation';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {MovieDetails} from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}
export const DetailScreen = ({route, navigation}: Props) => {
  const {poster_path, original_title, title, id} = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const {cast, isLoading, movieFull} = useMovieDetails(id);
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          style={styles.posterImage}
          source={{
            uri,
          }}
        />
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{original_title}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size={30} color="grey" style={{marginTop: 20}} />
      ) : (
        <MovieDetails movieFull={movieFull!} cast={cast} />
      )}

      <View style={styles.backButton}>
        <TouchableOpacity onPress={()=> navigation.pop()}>
          <Icon name="arrow-back-outline" color="white" size={50} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  posterImage: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,
    // borderBottomEndRadius: 14,
    // borderBottomStartRadius: 14,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
  },
});
