const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue, set, push } = require("firebase/database");
const config = require("../config/config");

class FirebaseService {
  constructor(oscService) {
    this.oscService = oscService;
    const app = initializeApp(config.firebase);
    this.database = getDatabase(app);
    this.initializeVideoListener();
    this.initializeOscListener();
  }

  initializeVideoListener() {
    const videoRef = ref(this.database, "currentVideo");
    onValue(videoRef, async (snapshot) => {
      await this.handleVideoUpdate(snapshot.val());
    });
  }

  initializeOscListener() {
    const oscRef = ref(this.database, "oscCommands");
    onValue(oscRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Processa cada comando na lista
        Object.keys(data).forEach(async (key) => {
          const command = data[key];
          if (command && !command.processed) {
            await this.handleOscCommand(command, key);
          }
        });
      }
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

  async handleOscCommand(data, commandKey) {
    if (data?.oscAddress) {
      try {
        const value = data.value !== undefined ? data.value : 1;
        await this.oscService.sendMessage(data.oscAddress, value);
        console.log(`OSC command sent to ${data.oscAddress} with value ${value}`);
        
        // Marca o comando como processado
        await set(ref(this.database, `oscCommands/${commandKey}/processed`), true);
      } catch (error) {
        console.error("Error sending OSC command:", error);
      }
    }
  }

  async updateCurrentVideo(videoId) {
    return set(ref(this.database, "currentVideo"), {
      playVideo: true,
      videoId,
    });
  }

  async sendOscCommand(oscAddress, value = 1) {
    return push(ref(this.database, "oscCommands"), {
      oscAddress,
      value,
      timestamp: Date.now(),
      processed: false,
    });
  }
}

module.exports = FirebaseService;
