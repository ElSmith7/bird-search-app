import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/utils-for-tests";
import Sightings from "../components/Sightings";

const bluetit = {
  id: "1",
  name: "blue tit",
  number: "5",
};

test("it shows the number of sightings, and two buttons", async () => {
  renderWithProviders(<Sightings bird={bluetit} />);
  const sightings = await screen.findByTestId(`${bluetit.number}`);
  const buttons = await screen.findAllByRole("button");

  expect(sightings).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(buttons).toHaveLength(2);
});
