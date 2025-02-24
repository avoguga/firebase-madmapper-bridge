const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue, set } = require("firebase/database");
const config = require("../config/config");

class FirebaseService {
  constructor(oscService) {
    this.oscService = oscService;
    const app = initializeApp(config.firebase);
    this.database = getDatabase(app);
    this.initializeVideoListener();
  }

  initializeVideoListener() {
    const videoRef = ref(this.database, "currentVideo");
    onValue(videoRef, async (snapshot) => {
      await this.handleVideoUpdate(snapshot.val());
    });
  }

  async handleVideoUpdate(data) {
    if (data?.playVideo && data?.videoId) {
      const oscAddress = config.videoOscMap[data.videoId];
      if (oscAddress) {
        try {
          await this.oscService.sendMessage(oscAddress, 1);
          console.log(`Cue ${data.videoId} started via Firebase`);
        } catch (error) {
          console.error("Error sending OSC command:", error);
        }
      }
    }
  }

  async updateCurrentVideo(videoId) {
    return set(ref(this.database, "currentVideo"), {
      playVideo: true,
      videoId,
    });
  }
}

module.exports = FirebaseService;
