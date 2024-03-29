import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { renderWithProviders } from "../utils/utils-for-tests";
import { handlers } from "./mocks/handlers";
import { server } from "./mocks/server";
import { _modalContainerMock } from "./mocks/modalContainer";
import SearchBird from "../components/SearchBird";

function renderComponent() {
  renderWithProviders(<SearchBird />);
}

beforeAll(() => {
  server.use(...handlers);
});

test("it shows two inputs and a button", () => {
  renderComponent();

  const birdInput = screen.getByRole("textbox");
  const numberInput = screen.getByRole("spinbutton");
  const button = screen.getByRole("button");

  expect(birdInput).toBeInTheDocument();
  expect(numberInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("inputs clear after submit", async () => {
  renderComponent();

  const birdInput = screen.getByRole("textbox");
  const numberInput = screen.getByRole("spinbutton");
  const button = screen.getByRole("button");

  await waitFor(() => {
    user.click(birdInput);
    user.keyboard("robin");

    user.click(numberInput);
    user.keyboard("2");
  });

  expect(birdInput).toHaveValue("robin");
  expect(numberInput).toHaveValue(2);

  await waitFor(() => {
    user.click(button);
  });

  expect(screen.getByTestId("button-loader")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByTestId("button-loader")).not.toBeInTheDocument();
  });
  expect(screen.getByRole("textbox")).toHaveValue("");
  expect(screen.getByRole("spinbutton")).toHaveValue(null);
});
test("modal shows when user enters nothing in search fields", async () => {
  renderComponent();

  const birdInput = screen.getByRole("textbox");
  const numberInput = screen.getByRole("spinbutton");
  const button = screen.getByRole("button");

  expect(birdInput).toHaveValue("");

  expect(numberInput).toHaveValue(null);

  await waitFor(() => {
    user.click(button);
  });

  expect(screen.getByTestId("modal")).toBeInTheDocument();
});

test("modal closes when OK is clicked", async () => {
  renderComponent();

  const button = screen.getByRole("button", { name: /Add/i });

  await waitFor(() => user.click(button));

  expect(screen.getByTestId("modal")).toBeInTheDocument();

  await waitFor(() => {
    user.click(screen.getByRole("button", { name: /OK/i }));
  });

  expect(screen.queryByTestId("modal")).not.toBeInTheDocument;
});
