import React from "react";

const VideoTitle = ({ title, description }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 md:pt-[14%] absolute text-white">
      <h1 className="text-2xl md:text-6xl text-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{description}</p>
      <div className="my-4 md:m-0">
        <button className="bg-white text-black py-1 md:p-4 px-3 md:px-12 text-base md:text-xl hover:bg-opacity-80 rounded-lg">
          ▶Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-4 px-12 text-xl hover:bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
