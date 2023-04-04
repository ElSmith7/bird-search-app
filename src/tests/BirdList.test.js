import { screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { renderWithProviders } from "../utils/utils-for-tests";
import BirdList from "../components/BirdList";

const handlers = [
  rest.get("/birds", (req, res, ctx) => {
    return res(
      ctx.json({
        birds: [
          { name: "blue tit", id: "1", number: "5" },
          { name: "grey heron", id: "2", number: "1" },
        ],
      })
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

test("render the correct number of birds", async () => {
  renderWithProviders(<BirdList />);

  const birdList = await screen.findAllByTestId("panel");

  expect(birdList).toHaveLength(2);
});

test("renders the heading with each bird's name", async () => {
  renderWithProviders(<BirdList />);
  const birds = ["blue tit", "grey heron"];

  for (let bird of birds) {
    const headings = await screen.findByRole("header", {
      name: new RegExp(`${bird}`),
    });
    expect(headings).toHaveTextContent(`${bird}`);
  }
});
