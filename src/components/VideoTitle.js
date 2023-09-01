import React from "react";

const VideoTitle = ({ title, description }) => {
  return (
    <div className="w-screen aspect-video pt-[14%] px-24 absolute text-white">
      <h1 className="text-6xl text-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{description}</p>
      <div>
        <button className="bg-white text-black p-4 px-12 text-xl hover:bg-opacity-80 rounded-lg">
          Play
        </button>
        <button className="mx-2 bg-gray-500 text-white p-4 px-12 text-xl hover:bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
