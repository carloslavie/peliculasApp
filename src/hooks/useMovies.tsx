import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { Movie, MovieDBNowPlaying } from '../interfaces/movieInterface';

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [peliculasCine, setPeliculasCine] = useState<Movie[]>();

    const getMovies = async ()=>{
        const response = await movieDB.get<MovieDBNowPlaying>('/now_playing');
        setPeliculasCine(response.data.results);
        setIsLoading(false);
    };
    useEffect(() => {
        getMovies();
      }, []);
  return {
    isLoading,
    peliculasCine,
  };
};
