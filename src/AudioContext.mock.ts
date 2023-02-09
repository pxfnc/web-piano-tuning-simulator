Object.defineProperty(window, "AudioContext", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    createOscillator: jest
      .fn()
      .mockImplementation(() => ({ connect: jest.fn() })),
  })),
});

export {};
