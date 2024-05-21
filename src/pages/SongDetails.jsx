import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [lyricId, setLyricId] = useState(null);

  const {
    data: songData,
    isFetching,
    isError,
    error,
  } = useGetSongDetailsQuery(songid);

  useEffect(() => {
    if (songData?.resources?.lyrics) {
      const lyricKeys = Object.keys(songData.resources.lyrics);
      if (lyricKeys.length > 0) {
        setLyricId(lyricKeys);
      }
    }
  }, [songData]);

  console.log("Lyric ID: ", lyricId);
  console.log("Song id from API: ", songid);

  const lyrics = lyricId
    ? songData?.resources?.lyrics[lyricId]?.attributes?.text
    : null;

  return (
    <div className="flex flex-col">
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          {lyrics ? (
            lyrics.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
