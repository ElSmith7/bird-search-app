import { screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import user from "@testing-library/user-event";
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
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays the App's heading", () => {
  renderWithProviders(<App />);

  const heading = screen.getByRole("heading", { name: /bird search/i });

  expect(heading).toBeInTheDocument();
});

test("displays the search bird form", () => {
  renderWithProviders(<App />);

  const searchForm = screen.getByText(/new bird/i);
  expect(searchForm).toBeInTheDocument();
});

test("fetches, loads and displays birdList", async () => {
  renderWithProviders(<App />);
  const birdList = await screen.findAllByTestId("bird");
  const loader = await screen.queryByTestId("loader");
  expect(loader).toBeInTheDocument();
  expect(birdList).toHaveLength(2);
  expect(loader).not.toBeInTheDocument();
});
