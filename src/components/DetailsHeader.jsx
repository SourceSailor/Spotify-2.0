import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetSongDetailsDataQuery } from "../redux/services/shazamCore";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const {
    data: songDetailsData,
    isFetching,
    isError,
    error,
  } = useGetSongDetailsDataQuery(songData?.data[0]?.id);

  const [currentArtistId, setCurrentArtistId] = useState(null);

  useEffect(() => {
    if (songData?.resources?.artists) {
      const artistKey = Object.keys(songData.resources.artists);
      if (artistKey.length > 0) {
        setCurrentArtistId(artistKey[0]);
      }
    }
  }, [songData]);

  const fetchArtistData = songData?.resources?.artists;

  // const artworkUrl = currentArtistId
  //   ? fetchArtistData?.[currentArtistId]?.attributes?.artwork?.url
  //   : null;

  const artworkUrl = songDetailsData?.images.coverart;

  console.log("Song Data From Details Header: ", songDetailsData);

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"></div>
      <div className="absolute inset-0 flex items-center">
        {fetchArtistData ? (
          <img
            className="sm:w-38 w-28 sm:h-38 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
            alt="artwork"
            src={artworkUrl}
          />
        ) : (
          <p className="text-white">No Artwork</p>
        )}
        <div className="ml-5">
          <h4>{songDetailsData?.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
