import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { renderWithProviders } from "../utils/utils-for-tests";
import { _modalContainerMock } from "./mocks/modalContainer";
import { _birdImgMock } from "./mocks/BirdImg";
import Bird from "../components/Bird";

const renderComponent = (bird) => {
  renderWithProviders(<Bird bird={bird} />);
};

const blueTit = {
  id: "1",
  name: "blue tit",
  number: "5",
};
const heron = {
  id: "2",
  name: "grey heron",
  number: "1",
};

test("shows bird name, remove button and bird image", async () => {
  renderComponent(blueTit);
  expect(
    await screen.findByRole("heading", {
      name: "blue tit",
    })
  ).toBeInTheDocument();
  expect(
    await screen.findByTestId(`removeButton-${blueTit.id}`)
  ).toBeInTheDocument();
  expect(await screen.findByText("Bird Img Component")).toBeInTheDocument();
});
test("shows the number of sightings, and two buttons", async () => {
  renderComponent(blueTit);
  const sightings = await screen.findByTestId(`${blueTit.number}`);
  const minusButton = await screen.findByTestId("minus-1");
  const plusButton = await screen.findByTestId("plus-1");

  expect(sightings).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(minusButton).toBeInTheDocument();
  expect(plusButton).toBeInTheDocument();
});
test("shows modal when remove button clicked", async () => {
  renderComponent(blueTit);
  const removeButton = await screen.findByTestId(`removeButton-${blueTit.id}`);

  await waitFor(() => {
    user.click(removeButton);
  });

  expect(screen.getByTestId("modal")).toBeInTheDocument();
});

test("shows modal if user clicks minus when sightings are 1", async () => {
  renderComponent(heron);
  const minusButton = screen.getByTestId(`minus-2`);

  await waitFor(() => {
    user.click(minusButton);
  });

  expect(screen.getByTestId("modal")).toBeInTheDocument();
});
