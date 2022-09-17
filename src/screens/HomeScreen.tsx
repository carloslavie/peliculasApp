/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useMovies} from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import {MoviePoster} from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { HorizontalSlider } from '../components/HorizontalSlider';

const windowWidth = Dimensions.get('window').width;
// const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying,popular,topRated,upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color={'red'} size={100} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20}}>
        {/* <MoviePoster movie={peliculasCine![1]}/> */}

        <View
          style={{
            height: 460,
          }}>
          <Carousel
            data={nowPlaying}
            renderItem={({item}: any) => <MoviePoster movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={320}
            inactiveSlideOpacity={0.9}
          />
        </View>
        {/* <HorizontalSlider title="En cine" movies={peliculasCine}/> */}
        <HorizontalSlider title="Popular" movies={popular}/>
        <HorizontalSlider title="Top Rated" movies={topRated}/>
        <HorizontalSlider title="Upcoming" movies={upcoming}/>
      </View>
    </ScrollView>
  );
};
