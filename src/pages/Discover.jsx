import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";

const Discover = () => {
  const genreTitle = "Pop";
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-col flex-row mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          name=""
          id=""
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 rounded-lg outline-none sm:mt-5 mt-0"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-center justify-start gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};
export default Discover;
