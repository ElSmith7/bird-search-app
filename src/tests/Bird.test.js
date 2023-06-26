import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { renderWithProviders } from "../utils/utils-for-tests";
import { _modalContainerMock } from "./mocks/modalContainer";
import { _birdImgMock } from "./mocks/BirdImg";
import Bird from "../components/Bird";

const renderComponent = (bird) => {
  renderWithProviders(<Bird bird={bird} />);
};

const bird = {
  id: "1",
  name: "blue tit",
  number: "5",
};

test("shows bird name, remove button and bird image", async () => {
  renderComponent(bird);
  expect(
    await screen.findByRole("heading", {
      name: "blue tit",
    })
  ).toBeInTheDocument();
  expect(
    await screen.findByTestId(`removeButton-${bird.id}`)
  ).toBeInTheDocument();
  expect(await screen.findByText("Bird Img Component")).toBeInTheDocument();
});
test("shows the number of sightings, and two buttons", async () => {
  renderComponent(bird);
  const sightings = await screen.findByTestId(`${bird.number}`);
  const minusButton = await screen.findByTestId("minus-1");
  const plusButton = await screen.findByTestId("plus-1");

  expect(sightings).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(minusButton).toBeInTheDocument();
  expect(plusButton).toBeInTheDocument();
});
test("shows modal before removal", async () => {
  renderComponent(bird);
  const removeButton = await screen.findByTestId(`removeButton-${bird.id}`);
  expect(removeButton).toBeInTheDocument();

  act(() => user.click(removeButton));

  await waitFor(() => {
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});
