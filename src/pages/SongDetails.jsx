import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { DetailsHeader } from "../components";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: songData,
    isFetching,
    isError,
    error,
  } = useGetSongDetailsQuery(songid);
  console.log("Song Data From Song Details: ", songData);

  const [lyricId, setLyricId] = useState(null);

  useEffect(() => {
    if (songData?.resources?.lyrics) {
      const lyricKey = Object.keys(songData.resources.lyrics);
      if (lyricKey.length > 0) {
        setLyricId(lyricKey[0]);
      }
    }
  });

  const songLyrics = lyricId
    ? songData?.resources?.lyrics[lyricId]?.attributes?.text
    : null;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          {songLyrics ? (
            songLyrics.map((line, i) => (
              <p key={i} className="text-white">
                {line}
              </p>
            ))
          ) : (
            <p className="text-white">No Lyrics Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
