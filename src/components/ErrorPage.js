import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black flex-col gap-3">
      <h1 className="text-white sm:text-3xl text-xl text-center sm:w-7/12 p-2"> Note: Unable to fetch movies if you are using JIO, as TMDB Api is blocked by your ISP.</h1>
      <h2 className="text-white sm:text-3xl text-xl text-center sm:w-7/12 p-2"> Please try to switch to other network</h2>
    </div>
  );
};

export default ErrorPage;