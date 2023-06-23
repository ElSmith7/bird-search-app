import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { renderWithProviders } from "../utils/utils-for-tests";
import { handlers } from "./mocks/handlers";
import { server } from "./mocks/server";
import { _modalContainerMock } from "./mocks/modalContainer";
import SearchBird from "../components/SearchBird";

describe("SearchBird", () => {
  beforeEach(() => {
    server.use(...handlers);
  });
  test("it shows two inputs and a button", () => {
    renderWithProviders(<SearchBird />);

    const birdInput = screen.getByRole("textbox");
    const numberInput = screen.getByRole("spinbutton");
    const button = screen.getByRole("button");

    expect(birdInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("inputs clear after submit", async () => {
    renderWithProviders(<SearchBird />);

    const birdInput = screen.getByRole("textbox");
    const numberInput = screen.getByRole("spinbutton");
    const button = screen.getByRole("button");

    user.click(birdInput);
    user.keyboard("robin");
    expect(birdInput).toHaveValue("robin");

    user.click(numberInput);
    user.keyboard("2");
    expect(numberInput).toHaveValue(2);

    user.click(button);
    expect(await screen.findByTestId("button-loader")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("button-loader")).not.toBeInTheDocument();
      expect(screen.getByRole("textbox")).toHaveValue("");
      expect(screen.getByRole("spinbutton")).toHaveValue(null);
    });
  });
  test("modal shows when user enters nothing in search fields", async () => {
    renderWithProviders(<SearchBird />);

    const birdInput = screen.getByRole("textbox");
    const numberInput = screen.getByRole("spinbutton");
    const button = screen.getByRole("button");

    expect(birdInput).toHaveValue("");

    expect(numberInput).toHaveValue(null);

    user.click(button);
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
  });

  test("modal closes when OK is clicked", async () => {
    renderWithProviders(<SearchBird />);

    const button = screen.getByRole("button", { name: /Add/i });

    user.click(button);

    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    user.click(screen.getByRole("button", { name: /OK/i }));
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument;
  });
});
