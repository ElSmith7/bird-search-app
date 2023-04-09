import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../utils/utils-for-tests";
import SearchBird from "../components/SearchBird";

const handlers = [
  rest.get("http://localhost:3005/birds", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: "1", name: "blue tit", number: "5" },
        { id: "2", name: "grey heron", number: "1" },
      ])
    );
  }),
  rest.post("http://localhost:3005/birds", async (req, res, ctx) => {
    return res(ctx.json({ name: "robin", number: "2" }));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

  expect(await screen.findByRole("textbox")).toHaveValue("");
  expect(await screen.findByRole("spinbutton")).toHaveValue(null);
});
