import { screen } from "@testing-library/react";
import { rest } from "msw";
import { renderWithProviders } from "../utils/utils-for-tests";
import { server } from "./mocks/server";
import { handlers } from "./mocks/handlers";
import { _birdImgMock } from "./mocks/BirdImg";
import BirdList from "../components/BirdList";

function renderComponent() {
  renderWithProviders(<BirdList />);
}
beforeAll(() => {
  server.use(...handlers);
});

test("renders the correct number of birds", async () => {
  renderComponent();

  const birdList = await screen.findAllByTestId("bird");

  expect(birdList).toHaveLength(2);
});

test("renders each bird's correct name", async () => {
  renderComponent();
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
  renderComponent();

  await screen.findAllByTestId("bird");

  let numbers = ["5", "1"];

  for (let number of numbers) {
    const sightings = await screen.findByTestId(`${number}`);
    expect(sightings).toHaveTextContent(`${number}`);
  }
});
test("shows the loader and error message when there's an error", async () => {
  renderComponent();

  const loader = screen.getByTestId("loader");

  expect(loader).toBeInTheDocument();
  server.use(
    rest.get("http://localhost:3005/birds", (req, res, ctx) => {
      return res(ctx.status(403));
    })
  );
  expect(loader).toBeInTheDocument();

  expect(await screen.findByText(/error/i)).toBeInTheDocument();
  expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  expect(screen.queryByTestId("bird")).not.toBeInTheDocument();
});
