import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePauseClick,
  handlePlayClick,
}) =>
  isPlaying && activeSong?.attributes?.name === song.attributes?.name ? (
    <FaPauseCircle
      size={35}
      className="text-gray-300"
      onClick={handlePauseClick}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className="text-gray-300"
      onClick={handlePlayClick}
    />
  );

export default PlayPause;
