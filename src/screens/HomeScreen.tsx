import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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

    if (peliculasCine){
        console.log(peliculasCine[2].title);
    }

  return (
    <View style={{marginTop:top + 20}}>
        {peliculasCine && <MoviePoster movie={peliculasCine[1]}/>}
    </View>
  );
};
