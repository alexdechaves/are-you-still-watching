import { useRef } from "react";
import MuxPlayer from "@mux/mux-player-react";

const secondsToStopVideo = 10; // timer

export default function App() {
  // Scenarios where we'd need to ask if they are still watching
  // - playing from last play point without any pausing or seeking

  const playerRef = useRef();

  let lastPlayedTimestamp;

  const handleAllUserActivity = (e) => {
    lastPlayedTimestamp = e.target.currentTime; // reset the last played timestamp after each play
  };

  const handleTimeUpdate = (e) => {
    player = playerRef.current;
    const timeElapsed = e.target.currentTime - lastPlayedTimestamp;
    console.log({
      lastPlayedTimestamp: lastPlayedTimestamp,
      currentTime: e.target.currentTime,
      timeElapsed: timeElapsed,
      isTimeElapsedPastThreshold: timeElapsed > secondsToStopVideo,
    });
    if (!player.paused && timeElapsed > secondsToStopVideo) {
      player.pause();
      alert("Are you still watching?");
      console.log({
        lastPlayedTimestamp: lastPlayedTimestamp,
        currentTime: e.target.currentTime,
        timeElapsed: timeElapsed,
        isTimeElapsedPastThreshold: timeElapsed > secondsToStopVideo,
      });
    }
  };

  return (
    <>
      <MuxPlayer
        ref={playerRef}
        muted
        playbackId="kqMRGo4PUHSlIuI701A01p6BpZMOu6TBfU3bI00m3F1901g"
        onPlaying={handleAllUserActivity}
        onSeeking={handleAllUserActivity}
        onRateChange={handleAllUserActivity}
        onVolumeChange={handleAllUserActivity}
        onTimeUpdate={handleTimeUpdate}
      />
    </>
  );
}
