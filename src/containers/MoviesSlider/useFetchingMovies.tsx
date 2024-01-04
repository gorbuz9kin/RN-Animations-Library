import { useState, useEffect } from 'react';

// https://developer.themoviedb.org/
const THE_MOVIE_DB_API_KEY = '95b232db5b891b6771b9c71f4ad69eec';
const REQUEST_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${THE_MOVIE_DB_API_KEY}`;

const getPosterPath = (path: string) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;

const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

type GenresType = {
  [key: number]: string;
};

type MovieType = {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  description: string;
  releaseDate: string;
  genres: string[];
};

const genres: GenresType = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

const useFetchingMovies = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  const fetchMovies = async () => {
    try {
      const resp = await fetch(REQUEST_URL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      const { results } = await resp.json();
      const moviesData = results.map(
        ({
          id,
          original_title,
          poster_path,
          backdrop_path,
          vote_average,
          overview,
          release_date,
          genre_ids,
        }: {
          id: number;
          original_title: string;
          poster_path: string;
          backdrop_path: string;
          vote_average: number;
          overview: string;
          release_date: string;
          genre_ids: number[];
        }) => ({
          id: String(id),
          title: original_title,
          poster: getPosterPath(poster_path),
          backdrop: getBackdropPath(backdrop_path),
          rating: vote_average,
          description: overview,
          releaseDate: release_date,
          genres: genre_ids.map(genre => genres[genre]),
        }),
      );
      setMovies([{ id: 'left-spacer' }, ...moviesData, { id: 'right-spacer' }]);
    } catch (e) {
      console.warn('FETCH MOVIES ERROR', e);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return { movies };
};

export default useFetchingMovies;
