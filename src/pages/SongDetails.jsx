import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

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

  // useEffect(() => {
  //   console.log("Song Data Structure:", songData);
  // }, [songData]);

  // useEffect(() => {
  //   console.log("songID: ", songid);
  //   console.log("Fetching:", isFetching, "Error:", isError, "Data:", songData);
  //   if (isError) {
  //     console.error("Error fetching song details:", error);
  //   }
  // }, [songid, isFetching, isError, songData, error]);

  console.log("Song id from API: ", songid);

  return (
    <div className="flex flex-col">
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          {/* {songData?.sections?.[1]?.type === "lyrics" ? (
            songData.sections[1].attributes.text.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
