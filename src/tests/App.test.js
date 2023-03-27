import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "./utils-for-tests";
import App from "../App";

test("displays the App's heading", () => {
  renderWithProviders(<App />);

  const heading = screen.getByRole("heading", { name: /bird search/i });

  expect(heading).toBeInTheDocument();
});

test("displays the search bird form", () => {
  renderWithProviders(<App />);

  const searchForm = screen.getByText(/search bird/i);
  expect(searchForm).toBeInTheDocument();
});
