import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "13de41bf25mshd068898ac63746ep10d0e8jsn3d35426009b6"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => ({
        url: "/v1/charts/world", // Use v1 path
        params: { country_code: "DZ" },
      }),
    }),
    getSongDetailsData: builder.query({
      query: (songid) => ({
        url: '/v1/tracks/details',
        params: { track_id: songid },
      }),
    }),
    getSongDetails: builder.query({
      query: (songid) => ({
        url: `/v2/tracks/details`, // Use v2 path
        params: { track_id: songid },
      }),
    }),
    getRelatedSongs: builder.query({
      query: (songid) => ({
        url: "/v1/tracks/related",
        params: { track_id: songid },
      }),
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongDetailsDataQuery,
  useGetRelatedSongsQuery,
} = shazamCoreApi;
