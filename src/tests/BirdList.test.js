import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/utils-for-tests";
import BirdList from "../components/BirdList";

test("render the correct number of birds", () => {
  const birds = [
    { name: "blue tit", id: 1 },
    { name: "grey heron", id: 2 },
  ];
  renderWithProviders(<BirdList birds={birds} />);

  const birdList = screen.getAllByTestId("panel");

  expect(birdList).toHaveLength(2);
});
