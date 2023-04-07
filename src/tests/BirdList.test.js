import { screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { renderWithProviders } from "../utils/utils-for-tests";
import BirdList from "../components/BirdList";

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

test("render the correct number of birds", async () => {
  renderWithProviders(<BirdList />);

  const birdList = await screen.findAllByTestId("panel");

  expect(birdList).toHaveLength(2);
});

test("renders the heading with each bird's name", async () => {
  renderWithProviders(<BirdList />);

  for (let bird of birds) {
    const headings = await screen.findByRole("header", {
      name: new RegExp(`${bird}`),
    });
    expect(headings).toHaveTextContent(`${bird}`);
  }
});
