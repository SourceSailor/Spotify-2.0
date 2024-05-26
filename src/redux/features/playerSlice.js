import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, { payload }) => {
      const { song, data, i } = payload;
      state.activeSong = song;
      state.currentSongs = data.tracks?.hits || data.tracks || data;
      state.currentIndex = i;
      state.isActive = true;
    },
    nextSong: (state, { payload }) => {
      const song = state.currentSongs[payload];
      state.activeSong = song.track || song;
      state.currentIndex = payload;
      state.isActive = true;
    },
    prevSong: (state, { payload }) => {
      const song = state.currentSongs[payload];
      state.activeSong = song.track || song;
      state.currentIndex = payload;
      state.isActive = true;
    },
    playPause: (state, { payload }) => {
      state.isPlaying = payload;
    },
    selectGenreListId: (state, { payload }) => {
      state.genreListId = payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
