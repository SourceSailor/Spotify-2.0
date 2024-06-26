import React from "react";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { useGetSongDetailsDataQuery } from "../redux/services/shazamCore";

const SongBar = ({
  song,
  songData,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const { data: songBarSongData, error, isLoading } = useGetSongDetailsDataQuery(song.key, {
    retry: 3, // Retry up to 3 times in case of failure
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading song details.</p>;

  console.log("Song Being Passed Through To Sound Bar Component: ", songBarSongData);

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={
            artistId
              ? song?.attributes?.artwork?.url
                  .replace("{w}", "125")
                  .replace("{h}", "125")
              : song?.images?.coverart
          }
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link to={`/songs/${songBarSongData?.trackadamid}`}>
              <p className="text-xl font-bold text-white">{song?.title}</p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white">
              {song?.attributes?.name}
            </p>
          )}
          <p className="text-base text-gray-300 mt-1">
            {artistId ? song?.attributes?.albumName : song?.subtitle}
          </p>
        </div>
      </div>
      {!artistId && (
        <PlayPause
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      )}
    </div>
  );
};

export default SongBar;
