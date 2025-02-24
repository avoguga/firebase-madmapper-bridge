const config = {
  firebase: {
    databaseURL: "yourdatabaseurl",
  },
  osc: {
    port: 8010,
  },
  server: {
    port: process.env.PORT || 3000,
  },
  videoOscMap: {
    video1: "/cues/selected/scenes/by_cell/col_1",
    video2: "/cues/selected/scenes/by_cell/col_2",
    video3: "/cues/selected/scenes/by_cell/col_3",
    video4: "/cues/selected/scenes/by_cell/col_4",
  },
};

module.exports = config;
