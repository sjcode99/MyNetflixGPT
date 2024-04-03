import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearchPage from "./GPT/GptSearchPage";
import { useSelector } from "react-redux";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import ErrorPage from "./ErrorPage";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  const movies = useSelector((store) => store.movies.popularMovies);

  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          {movies ? (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          ) : (
            <ErrorPage />
          )}
        </>
      )}
    </div>
  );
};

export default Browse;
