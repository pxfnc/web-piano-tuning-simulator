import React from "react";

const ctx = new AudioContext();
const osc = ctx.createOscillator();
osc.type = "triangle";
osc.connect(ctx.destination);

const App: React.FC = () => {
  return (
    <div>
      <h1>web piano tuning simulator</h1>
      <button onClick={() => osc.start()}>play sound</button>
      <button onClick={() => osc.stop()}>stop</button>
    </div>
  );
};

export default App;
