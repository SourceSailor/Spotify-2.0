import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetSongDetailsDataQuery } from "../redux/services/shazamCore";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const {
    data: songDetailsData,
    isFetching,
    isError,
    error,
  } = useGetSongDetailsDataQuery(songData?.data[0]?.id, {
    retry: 3, // Retry up to 3 times in case of failure
  })

  const fetchArtistData = songData?.resources?.artists;
  const artworkImageUrl = songDetailsData?.images?.coverart;
  const artistImgUrl = songDetailsData?.images?.background;

  console.log(
    "Song Data Being Fetched From API From Details Header: ",
    songDetailsData
  );
  console.log("Song Data From Details Header: ", songDetailsData);

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"></div>
      <div className="absolute inset-0 flex items-center ml-5">
        {fetchArtistData ? (
          <img
            className="sm:w-38 w-28 sm:h-38 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
            alt="artwork"
            src={artistImgUrl ? artistImgUrl : artworkImageUrl}
          />
        ) : (
          <p className="text-white">No Artwork</p>
        )}
        <div className="ml-5">
          <h4 className="text-white font-bold sm:text-3xl text-xl">
            {songDetailsData?.title}
          </h4>
          {!artistId && (
            <Link to={`/artists/${songDetailsData?.artists[0]?.alias}`}>
              <p className="text-gray-400 mt-2 text-base ">
                {songDetailsData?.subtitle}
              </p>
            </Link>
          )}
          <p className="text-gray-400 mt-2 text-base">
            {artistId
              ? artist?.genreNames[0]
              : songDetailsData?.genres?.primary}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-4 h-24" />
    </div>
  );
};

export default DetailsHeader;
