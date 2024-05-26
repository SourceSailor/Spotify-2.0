import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, RelatedSongs, Loader, Error } from "../components";
import {
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const [lyricId, setLyricId] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // Song Details Data From API
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error: songDetailsError,
  } = useGetSongDetailsQuery(songid, {
    retry: 3, // Retry up to 3 times in case of failure
  });

  console.log("Song Data V1 From Song Details Component: ", songData);

  // Related Songs Data From API
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error: relatedSongsError,
  } = useGetRelatedSongsQuery(songData?.data[0]?.id, {
    skip: !songData?.data[0]?.id, // Skip query if songData ID is not available
    retry: 3, // Retry up to 3 times in case of failure
  });
  console.log(
    "Related Songs Data Using V2 From Song Details Component: ",
    data
  );

  useEffect(() => {
    if (songData?.resources?.lyrics) {
      const lyricKey = Object.keys(songData.resources.lyrics);
      if (lyricKey.length > 0) {
        setLyricId(lyricKey[0]);
      }
    }
  }, [songData]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // Variable Holding The Song Lyric ID
  const songLyrics = lyricId
    ? songData?.resources?.lyrics[lyricId]?.attributes?.text
    : null;

  // Render loading or error state if needed
  if (isFetchingRelatedSongs || isFetchingSongDetails) {
    return <Loader title="Searching Song Details" />;
  }
  if (songDetailsError || relatedSongsError) {
    return (
      <Error
        message={`Error fetching song details: ${
          songDetailsError?.message || relatedSongsError?.message
        }`}
      />
    );
  }

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
      <RelatedSongs
        songData={songData}
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
