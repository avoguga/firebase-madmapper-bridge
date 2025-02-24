const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config/config");
const OSCService = require("./services/oscService");
const FirebaseService = require("./services/firebaseService");
const createVideoRouter = require("./routes/videoRoutes");

class App {
  constructor() {
    this.app = express();
    this.setupServices();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupServices() {
    this.oscService = new OSCService();
    this.firebaseService = new FirebaseService(this.oscService);
  }

  setupMiddleware() {
    this.app.use(bodyParser.json());
  }

  setupRoutes() {
    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public/index.html"));
    });
    this.app.use(createVideoRouter(this.firebaseService));
  }

  start() {
    this.app.listen(config.server.port, () => {
      console.log(
        `Server started on port ${config.server.port}. ` +
          "Listening for Firebase changes and sending OSC commands...",
      );
    });
  }
}

// Start the application
const app = new App();
app.start();
