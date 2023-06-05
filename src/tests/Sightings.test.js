import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/utils-for-tests";
import { setupServer } from "msw/node";
import { rest } from "msw";
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
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it shows the number of sightings, and two buttons", () => {});
