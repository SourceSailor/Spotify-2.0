import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });

  console.log("songID: ", songid);

  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId={artistId} songData={songData} /> */}
      <div className="mt-5 text-white">
        {songData?.sections?.[1]?.type === "LYRICS" ? (
          songData.sections[1].text.map((line, i) => (
            <p key={i} className="text-gray-400 text-base my-1">
              {line}
            </p>
          ))
        ) : (
          <p>Sorry, no lyrics found</p>
        )}
      </div>
    </div>
  );
};

export default SongDetails;
