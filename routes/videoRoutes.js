const express = require("express");
const config = require("../config/config");

function createVideoRouter(firebaseService) {
  const router = express.Router();

  router.post("/assign-video", async (req, res) => {
    const { videoId } = req.body;

    if (!config.videoOscMap[videoId]) {
      return res.status(400).json({
        success: false,
        message: "Invalid videoId",
      });
    }

    try {
      await firebaseService.updateCurrentVideo(videoId);
      res.json({
        success: true,
        message: `Cue ${videoId} assigned successfully`,
      });
    } catch (error) {
      console.error("Error updating Firebase:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  router.post("/send-osc", async (req, res) => {
    const { oscAddress, value = 1 } = req.body;

    if (!oscAddress) {
      return res.status(400).json({
        success: false,
        message: "OSC address is required",
      });
    }

    try {
      await firebaseService.sendOscCommand(oscAddress, value);
      res.json({
        success: true,
        message: `OSC command sent to ${oscAddress}`,
      });
    } catch (error) {
      console.error("Error sending OSC command:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  return router;
}

module.exports = createVideoRouter;
