# 🎧 React Native Audio & Transcript Interleave

A cross-platform **React Native Audio Player** that synchronizes spoken audio with transcript metadata.  
It highlights the currently spoken phrase while playing audio and provides playback controls (Play, Pause, Rewind, Forward, Repeat).  

This project was developed as part of an assessment task.

---

## 🚀 Features

- Play audio with synchronized transcript highlighting  
- Playback controls:  
  - ▶️ **Play** – play the audio from the current position  
  - ⏸ **Pause** – pause playback  
  - ⏪ **Rewind** – jump to the beginning of the current (or previous) phrase  
  - ⏩ **Forward** – jump to the next phrase  
  - 🔁 **Repeat** – replay the last phrase at **0.75x speed**  
- Highlight the current phrase during playback and pause  
- Cross-platform support: **Web, Android, iOS**

---

## 📂 Project Structure

project-root/
│── assets/ # Audio and transcript sample files
│── src/
│ ├── components/ # UI components (buttons, transcript, progress bar, etc.)
│ ├── services/ # Custom hooks (audio + transcript syncing)
│ ├── services/ # Custom hooks (audio + transcript syncing)
│ ├── screens/ # App screens
│ ├── utils/ # Helper functions
│── App.js # Entry point
│── package.json
│── README.md
│── index.js

---


---

## 🛠️ Installation & Setup

yarn install
# or
npm install

## Run the app
iOS
cd ios && pod install && cd ..
yarn ios

Android:
yarn android

Web
yarn start

📑 Metadata Input Format
The transcript metadata is provided as a JSON file in the following format:

{
  "pause": 250,
  "speakers": [
    {
      "name": "John",
      "phrases": [
        { "words": "this is one phrase.", "time": 1474 },
        { "words": "now the second phrase.", "time": 1667 }
      ]
    },
    {
      "name": "Alice",
      "phrases": [
        { "words": "another speaker phrase.", "time": 1214 }
      ]
    }
  ]
}
pause → duration (ms) of silence inserted after each phrase

time → duration (ms) of the phrase in the audio

🧪 Testing

The app includes unit tests for utility functions and integration tests for audio + transcript syncing.
yarn test


To run tests:
📦 Sample Files

✅ Sample transcript JSON (example_audio.json)

✅ Sample MP3 audio file (example_audio.mp3)

✅ Wireframe sketches

📖 Development Guidelines

Code follows React Native best practices and functional component patterns.

UI follows Atomic Design principle (atoms → molecules → organisms).

Commit history is clean, with small, meaningful commits.

Code is refactored, commented, and easy to extend.

👨‍💻 Author

Developed with ❤️ by Babrak Sohail# React-Native-Audio-and-Text-Interleave
