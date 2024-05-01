import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const options = {
//   method: "GET",
//   params: { country_code: "DZ" },
//   headers: {
//     "X-RapidAPI-Key": "13de41bf25mshd068898ac63746ep10d0e8jsn3d35426009b6",
//     "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
//   },
// };

// fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
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
        url: "/charts/world",
        params: { country_code: "DZ" },
      }),
    }),
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
