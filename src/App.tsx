import React, { useEffect, useState } from "react";

const ctx = new AudioContext();
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = "triangle";
osc.connect(gain);
gain.connect(ctx.destination);

const App: React.FC = () => {
  const [volume, setVolume] = useState<number>(0);

  useEffect(() => {
    const currentTime = ctx.currentTime;
    gain.gain.linearRampToValueAtTime(volume * 0.01, currentTime + 0.1);
  }, [volume]);

  return (
    <div>
      <h1>web piano tuning simulator</h1>
      <button onClick={() => osc.start()}>play sound</button>
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

export default App;
