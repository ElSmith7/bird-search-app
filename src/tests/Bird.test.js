import { setupServer } from "msw/node";
import { rest } from "msw";
import { screen } from "@testing-library/react";
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

jest.mock("../components/Sightings", () => {
  return () => {
    return "Sightings Component";
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

test("shows bird name, sightings, remove button and bird image", async () => {
  const bird = {
    id: "1",
    name: "robin",
    number: "5",
  };

  renderWithProviders(<Bird bird={bird} />);

  expect(
    await screen.findByRole("heading", {
      name: "robin",
    })
  ).toBeInTheDocument();
  expect(await screen.findByText("Sightings Component")).toBeInTheDocument();
  expect(await screen.findByTestId("remove button")).toBeInTheDocument();
  expect(await screen.findByText("Bird Img Component")).toBeInTheDocument();
});

test("shows modal before removal", async () => {
  renderWithProviders(<BirdList />);
});
