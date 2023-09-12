import React, { useRef } from "react";
import language from "../../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
// import { addApiKey } from "../../utils/gptSlice";
// import OpenAI from "openai";
import openai from "../../utils/openai";
import { API_OPTIONS } from "../../utils/constants";
import { addGptMovieResult } from "../../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config?.lang);
  const searchText = useRef(null);
  const apiKeyInput = useRef(null);
  const dispatch = useDispatch();

  //   const OPENAI_KEY = useSelector((store) => store.gpt?.OPENAI_KEY);

  //   const openai = new OpenAI({
  //     apiKey: "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",
  //     dangerouslyAllowBrowser: true,
  //   });

  //   if (apiKeyInput) {
  //     const openai = new OpenAI({
  //       apiKey: apiKeyInput?.current?.value,
  //       dangerouslyAllowBrowser: true,
  //     });
  //   }

  //   const handleOpenAIApiKey = () => {
  //     dispatch(addApiKey(apiKeyInput.current.value));
  //   };

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      "only give me names of 5 movies, comma separated like examples: hera pheri, dil chahta hai, 3 idiots";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    console.log(gptResults.choices?.[0]?.message?.content);

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      {/* {OPENAI_KEY !== null ? ( */}
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-3 m-3 md:p-4 md:m-4 col-span-9"
          placeholder={language[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {language[langKey].search}
        </button>
      </form>
      {/* ) : (
        <form
          className="w-full md:w-1/2 bg-black grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={apiKeyInput}
            type="text"
            className=" p-4 m-4 col-span-9"
            placeholder={language[langKey].apiKeyPlaceholder}
          />
          <button
            className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
            onClick={handleOpenAIApiKey}
          >
            Next
          </button>
        </form> */}
      {/* )} */}
    </div>
  );
};

export default GptSearchBar;
