import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const [currentArtistId, setCurrentArtistId] = useState(null);

  useEffect(() => {
    if (songData?.resources?.artists) {
      const artistKey = Object.keys(songData.resources.artists);
      if (artistKey.length > 0) {
        setCurrentArtistId(artistKey[0]);
      }
    }
  }, [songData]);

  const artworkUrl = currentArtistId
    ? songData?.resources?.artists[currentArtistId]?.attributes?.artwork?.url
    : null;

  console.log("Artist Image URL From Details Header: ", artworkUrl);
  console.log("Artist ID From Details Header: ", artworkUrl);
  console.log("Song Data From Details Header: ", songData);

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"></div>
      <div className="absolute inset-0 flex items-center">
        {artworkUrl ? (
          <img
            className="sm:w-38 w-28 sm:h-38 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
            alt="artwork"
            src={artworkUrl}
          />
        ) : (
          <p className="text-white">No Artwork</p>
        )}
      </div>
    </div>
  );
};

export default DetailsHeader;
