/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import { useMovies } from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import { MoviePoster } from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
// const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
    const {peliculasCine, isLoading} = useMovies();
    const {top} = useSafeAreaInsets();

    if (isLoading){
        return (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                <ActivityIndicator color={'red'} size={100}/>
            </View>
        );
    }

  return (
    <View style={{marginTop:top + 20}}>
        {/* <MoviePoster movie={peliculasCine![1]}/> */}

        <View style={{
            height: 440,
        }}>
            <Carousel
                data={peliculasCine}
                renderItem={({item}:any)=><MoviePoster movie={item}/>}
                sliderWidth={windowWidth}
                itemWidth={300}
            />
        </View>
    </View>
  );
};
