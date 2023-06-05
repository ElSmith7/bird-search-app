import { screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { renderWithProviders } from "../utils/utils-for-tests";

import Sightings from "../components/Sightings";

const handlers = [
  rest.get("http://localhost:3005/birds", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: "1", name: "blue tit", number: "5" },
        { id: "2", name: "grey heron", number: "1" },
      ])
    );
  }),
  rest.patch("http://localhost:3005/birds/1", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: "1", name: "blue tit", number: "4" },
        { id: "2", name: "grey heron", number: "1" },
      ])
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const bird = {
  id: "1",
  name: "blue tit",
  number: "5",
};

test("it shows the number of sightings, and two buttons", async () => {
  renderWithProviders(<Sightings bird={bird} />);
  const sightings = await screen.findByTestId(`${bird.number}`);
  const buttons = await screen.findAllByRole("button");

  expect(sightings).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(buttons).toHaveLength(2);
});
