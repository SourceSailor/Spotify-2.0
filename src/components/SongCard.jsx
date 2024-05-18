import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  // console.log("song: ", song);

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-70 group-hover:flex ${
            activeSong?.attributes?.name === song.attributes?.name
              ? "flex bg-black bg-opacity-60"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        </div>
        <img src={song.attributes?.artwork?.url} alt="Song_img" />
      </div>
      <div className=" mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.id}`}>{song.attributes?.name}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.attributes?.artistName?.adamid}`
                : "/top-artists"
            }
          >
            {song.attributes?.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
