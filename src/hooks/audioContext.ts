import React, { useContext } from "react";

const audioContext = React.createContext<AudioContext | null>(
  new window.AudioContext()
);

export const AudioContextProvider = audioContext.Provider;

export const useAudioContext = () => useContext(audioContext);
