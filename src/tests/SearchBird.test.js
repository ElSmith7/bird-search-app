import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/utils-for-tests";
import user from "@testing-library/user-event";
import SearchBird from "../components/SearchBird";

test("it shows two inputs and a button", () => {
  renderWithProviders(<SearchBird />);

  const birdInput = screen.getByRole("textbox");
  const numberInput = screen.getByRole("spinbutton");
  const button = screen.getByRole("button");

  expect(birdInput).toBeInTheDocument();
  expect(numberInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("calls addBird when form is submitted", async () => {
  const mock = jest.fn();

  renderWithProviders(<SearchBird addBird={mock} />);

  const birdInput = screen.findByRole("textbox", { name: /bird/i });
  const numberInput = screen.findByRole("spinbutton", { name: /number/i });

  user.click(birdInput);
  user.keyboard("gold finch");

  user.click(numberInput);
  user.keyboard("6");

  const button = screen.getByRole("button");

  user.click(button);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "gold finch", number: "6" });
});
