# Firebase-Madmapper OSC Bridge

## Overview

This project provides a solution for controlling Madmapper through web interfaces by bridging Firebase Realtime Database with OSC (Open Sound Control) messages. It's particularly useful for installations, performances, or any scenario where you need to control Madmapper remotely through web or mobile applications.

![System Architecture](architecture-diagram.png)

## The Problem & Solution

Madmapper only accepts OSC messages for external control, which makes it challenging to integrate with modern web and mobile applications. This project solves this limitation by:

1. Providing a web interface for controlling Madmapper
2. Using Firebase as a real-time message broker
3. Running a Node.js server that translates Firebase events into OSC messages

## Features

- 🎯 Real-time control of Madmapper through web interface
- 🔥 Firebase Realtime Database integration
- 🎮 OSC message translation
- 📱 Responsive web interface for mobile devices
- ⚡ Low-latency message delivery
- 🛡️ Error handling and status feedback

## Prerequisites

- Node.js (v14 or higher)
- Firebase account
- Madmapper software
- Basic understanding of OSC protocol

## Installation

1. Clone the repository:

```bash
git clone https://github.com/avoguga/firebase-madmapper-bridge.git
cd firebase-madmapper-bridge
```

2. Install dependencies:

```bash
npm install
```

3. Configure Firebase:

   - Create a new Firebase project
   - Copy your Firebase configuration to `config/config.js`
   - Enable Realtime Database in your Firebase project

4. Configure Madmapper:

   - Ensure Madmapper is running and listening for OSC messages
   - Default OSC port is 8010 (configurable in `config/config.js`)

5. Start the server:

```bash
npm start
```

## Project Structure

```
project/
  ├── config/
  │   └── config.js         # Configuration files
  ├── utils/
  │   └── networkUtils.js   # Network utility functions
  ├── services/
  │   ├── oscService.js     # OSC message handling
  │   └── firebaseService.js # Firebase integration
  ├── routes/
  │   └── videoRoutes.js    # Express routes
  ├── public/
  │   └── index.html        # Web interface
  └── app.js                # Main application
```

## Configuration

The project uses a configuration file (`config/config.js`) for all major settings:

```javascript
const config = {
  firebase: {
    databaseURL: "your-firebase-url",
  },
  osc: {
    port: 8010,
  },
  server: {
    port: 3000,
  },
};
```

## Usage

1. Access the web interface at `http://localhost:3000`
2. Click on any cue button to trigger the corresponding Madmapper scene
3. The system will:
   - Send the command to Firebase
   - Detect the change through the Node.js server
   - Convert it to an OSC message
   - Send it to Madmapper

## OSC Message Format

The system sends OSC messages in the following format:

```
/cues/selected/scenes/by_cell/col_[number] 1
```

## Error Handling

The system provides comprehensive error handling:

- Network connectivity issues
- Firebase connection problems
- OSC message delivery failures
- Invalid cue assignments

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Madmapper team for their excellent software
- Firebase team for the real-time database
- Node-OSC library maintainers

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/avoguga/firebase-madmapper-bridge/issues) section
2. Create a new issue if needed

## Author

[Gustavo Henrique](https://github.com/avoguga)

---

Made with ❤️ for the creative coding community
