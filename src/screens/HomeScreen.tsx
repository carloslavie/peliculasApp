/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import {useMovies} from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import {MoviePoster} from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import {getPosterColors} from '../helpers/getColores';
import {GradientContext} from '../context/GradientContext';
import {useEffect} from 'react';

const windowWidth = Dimensions.get('window').width;
// const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext);

  const getImageColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [primary = 'green', secondary = 'orange'] = await getPosterColors(
      uri,
    );
    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getImageColors(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color={'red'} size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
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
              onSnapToItem={index => getImageColors(index)}
            />
          </View>
          {/* <HorizontalSlider title="En cine" movies={peliculasCine}/> */}
          <HorizontalSlider title="Popular" movies={popular} />
          <HorizontalSlider title="Top Rated" movies={topRated} />
          <HorizontalSlider title="Upcoming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
