import './AudioContext.mock'
import { render, screen } from "@testing-library/react";
import App from "./App";

test("App has title", () => {
  render(<App />);
  expect(screen.queryByRole("heading", { level: 1 })).toHaveTextContent(
    /web piano tuning simulator/
  );
});
