import { renderWithProviders } from "../utils/utils-for-tests";
import { screen } from "@testing-library/react";
import Bird from "../components/Bird";

est.mock("../components/BirdImg", () => {
  return () => {
    return "Bird Img Component";
  };
});

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
