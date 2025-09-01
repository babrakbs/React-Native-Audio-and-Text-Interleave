import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Sound from "react-native-sound";
import MessageBubble from "../../Components/MessageBubble";
import AudioPlayerControls from "../../Components/AudioPlayer";
import { colors } from "../../Constants/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { parseTranscript } from "../../Utils/transcriptUtils";
import transcriptData from "../../assets/MetaData/example_audio.json";
import { styles } from "./style";

const AudioScreen = () => {
  const [phrases, setPhrases] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const soundRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Load transcript
    const parsed = parseTranscript(transcriptData);
    setPhrases(parsed);

    Sound.setCategory("Playback");

    const sound = new Sound("example_audio", Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        // console.log("❌ Failed to load sound", err);
        return;
      }
      // console.log("✅ Sound loaded, duration:", sound.getDuration());
      setDuration(sound.getDuration());
    });

    soundRef.current = sound;

    return () => {
      if (soundRef.current) soundRef.current.release();
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTracking = () => {
    const sound = soundRef.current;
    if (!sound) return;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      sound.getCurrentTime((seconds) => {
        setCurrentTime(seconds);

        // highlight current phrase
        const index = phrases.findIndex(
          (p) => seconds * 1000 >= p.start && seconds * 1000 <= p.end
        );
        if (index !== -1) setCurrentPhrase(index);
      });
    }, 200);
  };

  const togglePlay = () => {
    const sound = soundRef.current;
    if (!sound) return;

    if (isPlaying) {
      sound.pause();
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      sound.play(() => {
        setIsPlaying(false);
        clearInterval(intervalRef.current);
      });
      startTracking();
      setIsPlaying(true);
    }
  };

const rewind = () => {
  if (!phrases.length || !soundRef.current) return;
  const sound = soundRef.current;

  // If audio has finished completely, start from beginning
  if (currentTime >= duration) {
    sound.setCurrentTime(0);
    setCurrentTime(0);
    setCurrentPhrase(0);
    setIsPlaying(true);
    startTracking();
    sound.play();
    return;
  }

  const current = phrases[currentPhrase];

  // If we are past half of the current phrase, go to its start
  if (current && currentTime * 1000 > current.start + 500) {
    sound.setCurrentTime(current.start / 1000);
  } 
  // Else, go to the previous phrase if it exists
  else if (currentPhrase > 0) {
    const prev = phrases[currentPhrase - 1];
    sound.setCurrentTime(prev.start / 1000);
    setCurrentPhrase(currentPhrase - 1);
  } 
  // If already at the first phrase, reset to its start
  else {
    sound.setCurrentTime(phrases[0].start / 1000);
  }

  // If audio was playing, resume tracking
  if (isPlaying) startTracking();
};


const forward = () => {
  if (!phrases.length || !soundRef.current) return;
  const sound = soundRef.current;

  // not on last phrase, go to next
  if (currentPhrase < phrases.length - 1) {
    const next = phrases[currentPhrase + 1];
    sound.setCurrentTime(next.start / 1000);
    setCurrentPhrase(currentPhrase + 1);

    if (isPlaying) startTracking();
  } 
  // On last phrase, jump to its start
  else {
    const last = phrases[phrases.length - 1];
    sound.setCurrentTime(last.start / 1000);
    setCurrentPhrase(phrases.length - 1);

    if (isPlaying) startTracking();
  }
};


/* 🔹 Repeat (last phrase slowly at 0.75x only) */
const repeat = () => {
  if (!phrases.length || !soundRef.current) return;

  const lastIndex = phrases.length - 1;
  const target = phrases[lastIndex];
  const sound = soundRef.current;

  // Clear any previous interval
  clearInterval(intervalRef.current);

  // Highlight last phrase
  setCurrentPhrase(lastIndex);
  setIsPlaying(true);

  // Start from last phrase
  sound.setCurrentTime(target.start / 1000);
  sound.setSpeed(0.75); // only for last phrase

  // Start tracking playback
  intervalRef.current = setInterval(() => {
    sound.getCurrentTime((seconds) => {
      setCurrentTime(seconds);

      // Stop playback exactly at last phrase end
      if (seconds * 1000 >= target.end) {
        sound.pause();
        sound.setSpeed(1); // reset speed to normal
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        setCurrentTime(target.end / 1000);
      }
    });
  }, 200);

  sound.play();
};

  const seekTo = (sec) => {
    if (soundRef.current) {
      soundRef.current.setCurrentTime(sec);
      setCurrentTime(sec);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {phrases?.map((p, i) => (
          <MessageBubble
            key={i}
            speaker={p.speaker}
            text={p.text}
            highlight={i === currentPhrase}
          />
        ))}
      </ScrollView>

      <AudioPlayerControls
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        onPlayPause={togglePlay}
        onRewind={rewind}
        onForward={forward}
        onRepeat={repeat}
        onSeek={seekTo}
      />
    </SafeAreaView>
  );
};


export default AudioScreen;
