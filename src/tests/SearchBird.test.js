import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../utils/utils-for-tests";
import Modal from "../components/Modal";
import SearchBird from "../components/SearchBird";

const modalContainerMock = document.createElement("div");
modalContainerMock.setAttribute("class", "modal-container");
document.body.appendChild(modalContainerMock);

const handlers = [
  rest.get("http://localhost:3005/birds", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: "1", name: "blue tit", number: "5" },
        { id: "2", name: "grey heron", number: "1" },
      ])
    );
  }),
  rest.post("http://localhost:3005/birds", async (req, res, ctx) => {
    return res(ctx.json({ name: "robin", number: "2" }));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it shows two inputs and a button", () => {
  renderWithProviders(<SearchBird />);

  const birdInput = screen.getByRole("textbox");
  const numberInput = screen.getByRole("spinbutton");
  const button = screen.getByRole("button");

  expect(birdInput).toBeInTheDocument();
  expect(numberInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("inputs clear after submit", async () => {
  renderWithProviders(<SearchBird />);

  const birdInput = screen.getByRole("textbox");
  const numberInput = screen.getByRole("spinbutton");
  const button = screen.getByRole("button");

  user.click(birdInput);
  user.keyboard("robin");
  expect(birdInput).toHaveValue("robin");

  user.click(numberInput);
  user.keyboard("2");
  expect(numberInput).toHaveValue(2);

  user.click(button);
  expect(await screen.findByTestId("button-loader")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByTestId("button-loader")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getByRole("spinbutton")).toHaveValue(null);
  });
});
test("modal shows when user enters nothing in search fields", async () => {
  renderWithProviders(<SearchBird />);

  const birdInput = screen.getByRole("textbox");
  const numberInput = screen.getByRole("spinbutton");
  const button = screen.getByRole("button");

  expect(birdInput).toHaveValue("");

  expect(numberInput).toHaveValue(null);

  user.click(button);
  await waitFor(() => {
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});

test("modal closes when OK is clicked", async () => {
  renderWithProviders(<SearchBird />);

  const button = screen.getByRole("button", { name: /Add/i });

  user.click(button);

  await waitFor(() => {
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  user.click(screen.getByRole("button", { name: /OK/i }));
  expect(screen.queryByTestId("modal")).not.toBeInTheDocument;
});
