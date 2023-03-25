import { render, screen } from "@testing-library/react";
import App from "../App";

test("displays the App's heading", () => {
  render(<App />);

  const heading = screen.getByRole("heading", { name: /bird search/i });

  expect(heading).toBeInTheDocument();
});

test("displays the search bird form", () => {
  render(<App />);

  const searchForm = screen.getByText(/search bird/i);
  expect(searchForm).toBeInTheDocument();
});
