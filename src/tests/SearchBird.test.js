import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "./utils-for-tests";
import SearchBird from "../components/SearchBird";

test("it shows two inputs and a button", () => {
  renderWithProviders(<SearchBird />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});
