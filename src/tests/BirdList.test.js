import { screen } from "@testing-library/react";
import { setUpServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../utils/utils-for-tests";
import BirdList from "../components/BirdList";

const handlers = [
  rest.get("/birds", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "blue tit", id: 1 },
        { name: "grey heron", id: 2 },
      ])
    );
  }),
];
const server = setUpServer(...handlers);

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
  const birds = [
    { name: "blue tit", id: 1 },
    { name: "grey heron", id: 2 },
  ];
  renderWithProviders(
    <MemoryRouter>
      <BirdList birds={birds} />
    </MemoryRouter>
  );

  const birdList = screen.getAllByTestId("panel");

  expect(birdList).toHaveLength(2);
});

test("render the name and numbers");
