import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieInterface';

interface MoviesState{
  nowPlaying: Movie[];
  popular:Movie[];
  topRated:Movie[];
  upcoming:Movie[];
}
export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
      nowPlaying: [],
      popular:[],
      topRated:[],
      upcoming:[],
    });

    const getMovies = async ()=>{
        const now_playing = movieDB.get<MovieDBMoviesResponse>('/now_playing');
        const popular     = movieDB.get<MovieDBMoviesResponse>('/popular');
        const top_rated   = movieDB.get<MovieDBMoviesResponse>('/top_rated');
        const upcoming    = movieDB.get<MovieDBMoviesResponse>('/upcoming');

        const response = await Promise.all([
          now_playing,
          popular,
          top_rated,
          upcoming]);

          setMoviesState({
            nowPlaying: response[0].data.results,
            popular:response[1].data.results,
            topRated:response[2].data.results,
            upcoming:response[3].data.results,
          });
        setIsLoading(false);
    };
    useEffect(() => {
        getMovies();
      }, []);
  return {
    ...moviesState,
    isLoading,
  };
};
