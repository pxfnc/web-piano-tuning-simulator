import React, { useEffect, useState } from "react";
import { AudioContextProvider, useAudioContext } from "./hooks/audioContext";

// const ctx = new AudioContext();
// const osc = ctx.createOscillator();
// const gain = ctx.createGain();
// osc.type = "triangle";
// osc.connect(gain);
// gain.connect(ctx.destination);

const useWave = (hz: number): { play: () => void; stop: () => void } => {
  const ctx = useAudioContext();
  const [osc, setOsc] = useState<OscillatorNode | null>(null);
  const [gain, setGain] = useState<GainNode | null>(null);

  useEffect(() => {
    if (ctx == null) return;

    const newOsc = ctx.createOscillator();
    newOsc.frequency.setValueAtTime(hz, ctx.currentTime);

    const newGain = ctx.createGain();
    newGain.gain.setValueAtTime(0, ctx.currentTime);

    newOsc.connect(newGain);
    newGain.connect(ctx.destination);

    newOsc.start();

    setOsc(newOsc);
    setGain(newGain);

    return () => {
      newOsc.disconnect();
      newGain.disconnect();
    };
  }, [ctx]);

  return {
    play: () => {
      if (ctx == null) return;
      console.log("ctx", ctx);
      console.log("gain", gain?.gain.value);
      gain?.gain.setValueAtTime(0, ctx.currentTime);
      gain?.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
    },
    stop: () => {
      if (ctx == null) return;
      gain?.gain.setValueAtTime(gain?.gain.value, ctx.currentTime);
      gain?.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.2);
    },
  };
};

const Wave: React.FC<{ hz: number }> = ({ hz }) => {
  const [volume, setVolume] = useState<number>(0);
  const { play, stop } = useWave(hz);
  return (
    <div>
      {hz}hz
      <button onClick={() => play()}>play</button>
      <button onClick={() => stop()}>stop</button>
      <label>
        volume
        <input
          type="range"
          max="100"
          min="0"
          defaultValue={0}
          onChange={(e) => setVolume(parseInt(e.currentTarget.value, 10))}
        />
      </label>
    </div>
  );
};
const App: React.FC = () => {
  const [ctx, setCtx] = useState<AudioContext | null>(null);
  return (
    <div
      onClickCapture={() => {
        if (ctx == null) {
          setCtx(new AudioContext());
        }
      }}
    >
      <AudioContextProvider value={ctx}>
        <h1>web piano tuning simulator</h1>
        <Wave hz={440} />
        <Wave hz={660} />
        <Wave hz={659.25} />
        <Wave hz={880} />
      </AudioContextProvider>
    </div>
  );
};

export default App;
