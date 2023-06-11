import { setupServer } from "msw/node";
import { rest } from "msw";
import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { renderWithProviders } from "../utils/utils-for-tests";
import Bird from "../components/Bird";

const modalContainerMock = document.createElement("div");
modalContainerMock.setAttribute("class", "modal-container");
document.body.appendChild(modalContainerMock);

jest.mock("../components/BirdImg", () => {
  return () => {
    return "Bird Img Component";
  };
});

// const handlers = [
//   rest.get("http://localhost:3005/birds", (req, res, ctx) => {
//     return res(
//       ctx.json([
//         { id: "1", name: "blue tit", number: "5" },
//         { id: "2", name: "grey heron", number: "1" },
//       ])
//     );
//   }),
// ];
// const server = setupServer(...handlers);

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

const bird = {
  id: "1",
  name: "blue tit",
  number: "5",
};
test("shows bird name, remove button and bird image", async () => {
  renderWithProviders(<Bird bird={bird} />);

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
test("it shows the number of sightings, and two buttons", async () => {
  renderWithProviders(<Bird bird={bird} />);
  const sightings = await screen.findByTestId(`${bird.number}`);
  const minusButton = await screen.findByTestId("minus-1");
  const plusButton = await screen.findByTestId("plus-1");

  expect(sightings).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(minusButton).toBeInTheDocument();
  expect(plusButton).toBeInTheDocument();
});
test("shows modal before removal", async () => {
  renderWithProviders(<Bird bird={bird} />);
  const removeButton = await screen.findByTestId(`removeButton-${bird.id}`);
  expect(removeButton).toBeInTheDocument();

  user.click(removeButton);

  await waitFor(() => {
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});
