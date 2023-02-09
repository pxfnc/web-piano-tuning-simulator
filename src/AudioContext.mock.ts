Object.defineProperty(window, "AudioContext", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    createOscillator: jest
      .fn()
      .mockImplementation(() => ({ connect: jest.fn() })),
    createGain: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      gain: {
        linearRampToValueAtTime: jest.fn(),
      },
    })),
    currentTime: 0,
  })),
});

export {};
