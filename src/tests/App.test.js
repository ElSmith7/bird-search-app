import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { renderWithProviders } from "../utils/utils-for-tests";
import App from "../App";

const handlers = [
  rest.get("http://localhost:3005/birds", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: "1", name: "blue tit", number: "5" },
        { id: "2", name: "grey heron", number: "1" },
      ])
    );
  }),
  rest.post("http://localhost:3005/birds", (req, res, ctx) => {
    return res(ctx.json({ id: 3, name: "robin", number: "2" }));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays the App's heading", async () => {
  renderWithProviders(<App />);
  await screen.findAllByTestId("bird");

  const heading = screen.getByRole("heading", { name: /bird search/i });

  expect(heading).toBeInTheDocument();
});

test("displays the search bird form", async () => {
  renderWithProviders(<App />);
  await screen.findAllByTestId("bird");

  const searchForm = screen.getByRole("textbox", { name: /bird/i });
  expect(searchForm).toBeInTheDocument();
});

test("fetches, loads and displays birdList", async () => {
  renderWithProviders(<App />);

  const loader = screen.queryByTestId("loader");

  expect(loader).toBeInTheDocument();

  const birdList = await screen.findAllByTestId("bird");

  expect(birdList).toHaveLength(2);
  expect(loader).not.toBeInTheDocument();
});

test("adds new bird when form is submitted", async () => {
  renderWithProviders(<App />);

  const loader = screen.queryByTestId(/button loader/i);
  const birdInput = screen.getByRole("textbox", { name: /bird/i });
  const numberInput = screen.getByRole("spinbutton", {
    name: /number/i,
  });
  const button = screen.getByRole("button", { name: /add/i });

  await screen.findAllByTestId("bird");

  user.click(birdInput);
  user.keyboard("robin");
  user.click(numberInput);
  user.keyboard("2");
  user.click(button);

  expect(await screen.findByTestId(/button loader/i)).toBeInTheDocument();

  server.use(
    rest.get("http://localhost:3005/birds", (req, res, ctx) => {
      return res(
        ctx.json([
          { id: "1", name: "blue tit", number: "5" },
          { id: "2", name: "grey heron", number: "1" },
          { id: "3", name: "robin", number: "2" },
        ])
      );
    })
  );

  expect(loader).not.toBeInTheDocument();
  expect(await screen.findByRole("spinbutton")).toHaveValue(null);
  expect(await screen.findByRole("textbox")).toHaveValue("");

  expect(await screen.findByText(/robin/i)).toBeInTheDocument();
  expect(await screen.findByText(/2/i)).toBeInTheDocument();
});
