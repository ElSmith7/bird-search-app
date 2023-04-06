import { screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../utils/utils-for-tests";
import user from "@testing-library/user-event";
import SearchBird from "../components/SearchBird";

const handlers = [
  rest.get("/birds", (req, res, ctx) => {
    return res(
      ctx.json([{ id: "4", name: "blue tit", number: "1" }]),
      ctx.delay(150)
    );
  }),
];
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
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

test("adds a new bird after clicking the add button", async () => {
  renderWithProviders(<SearchBird />);
  expect(screen.queryByAltText("loader")).not.toBeInTheDocument();

  const birdInput = screen.getByRole("textbox", { name: /bird/i });
  const numberInput = screen.getByRole("spinbutton", {
    name: /number/i,
  });
  const button = screen.getByRole("button", { name: /add/i });

  user.click(birdInput);
  user.keyboard("blue tit");
  user.click(numberInput);
  user.keyboard("1");
  user.click(button);

  expect(await screen.findByText(/blue tit/i)).toBeInTheDocument();
  expect(await screen.findByText(/1/i)).toBeInTheDocument();
  expect(birdInput).toHaveValue("");
  expect(numberInput).toHaveValue("0" || "");
  expect(loader).not.toBeInTheDocument();
});
