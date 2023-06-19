import { screen } from "@testing-library/react";
import { rest } from "msw";
import { renderWithProviders } from "../utils/utils-for-tests";
import { server } from "./mocks/server";
import { handlers } from "./mocks/handlers";
import BirdList from "../components/BirdList";

jest.mock("../components/BirdImg", () => {
  return () => {
    return "Bird Img Component";
  };
});

describe("BirdList", () => {
  beforeEach(() => {
    server.use(...handlers);
  });
  test("renders the correct number of birds", async () => {
    renderWithProviders(<BirdList />);

    const birdList = await screen.findAllByTestId("bird");

    expect(birdList).toHaveLength(2);
  });

  test("renders each bird's name", async () => {
    renderWithProviders(<BirdList />);
    await screen.findAllByTestId("bird");

    let birds = ["blue tit", "grey heron"];

    for (let bird of birds) {
      const headings = await screen.findByRole("heading", {
        name: new RegExp(`${bird}`),
      });
      expect(headings).toHaveTextContent(`${bird}`);
    }
  });

  test("renders the correct sightings for each bird", async () => {
    renderWithProviders(<BirdList />);
    await screen.findAllByTestId("bird");

    let numbers = ["5", "1"];

    for (let number of numbers) {
      const sightings = await screen.findByTestId(`${number}`);
      expect(sightings).toHaveTextContent(`${number}`);
    }
  });
  test("shows the loader and error message when there's an error", async () => {
    renderWithProviders(<BirdList />);

    const loader = screen.queryByTestId("loader");

    expect(loader).toBeInTheDocument();
    server.use(
      rest.get("http://localhost:3005/birds", (req, res, ctx) => {
        return res(ctx.status(403));
      })
    );
    expect(loader).toBeInTheDocument();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    expect(screen.queryByTestId("bird")).not.toBeInTheDocument();
  });
});
