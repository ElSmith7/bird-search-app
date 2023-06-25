import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { rest } from "msw";
import { renderWithProviders } from "../utils/utils-for-tests";
import { server } from "./mocks/server";
import { handlers } from "./mocks/handlers";
import { _modalContainerMock } from "./mocks/modalContainer";
import { _birdImgMock } from "./mocks/BirdImg";
import App from "../App";

function renderComponent() {
  renderWithProviders(<App />);
}

beforeAll(() => {
  server.use(...handlers);
});

test("displays the App's heading", async () => {
  renderComponent();
  await screen.findAllByTestId("bird");

  const heading = screen.getByRole("heading", { name: /bird search/i });

  expect(heading).toBeInTheDocument();
});

test("displays the search bird form", async () => {
  renderComponent();

  await screen.findAllByTestId("bird");

  const searchForm = screen.getByRole("textbox", { name: /bird/i });
  expect(searchForm).toBeInTheDocument();
});

test("should fetch, load and display birdList", async () => {
  renderComponent();

  expect(screen.getByTestId("loader")).toBeInTheDocument();

  const birdList = await screen.findAllByTestId("bird");

  expect(birdList).toHaveLength(2);
  expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
});

test("adds new bird on submit", async () => {
  renderComponent();

  await screen.findAllByTestId("bird");

  const birdInput = screen.getByRole("textbox", { name: /bird/i });
  const numberInput = screen.getByRole("spinbutton", {
    name: /number/i,
  });
  const button = screen.getByRole("button", { name: /add/i });

  await screen.findAllByTestId("bird");

  user.click(birdInput);
  user.keyboard("robin");
  user.click(numberInput);
  user.keyboard("2");
  user.click(button);

  expect(await screen.findByTestId("button-loader")).toBeInTheDocument();

  server.use(
    rest.get("http://localhost:3005/birds", (req, res, ctx) => {
      return res(
        ctx.json([
          { id: "1", name: "blue tit", number: "5" },
          { id: "2", name: "grey heron", number: "1" },
          { id: "3", name: "robin", number: "2" },
        ])
      );
    })
  );

  expect(await screen.findByRole("spinbutton")).toHaveValue(null);
  expect(await screen.findByRole("textbox")).toHaveValue("");

  expect(await screen.findByText(/robin/i)).toBeInTheDocument();
  expect(await screen.findByText(/2/i)).toBeInTheDocument();
});

test("removes correct bird on delete", async () => {
  renderComponent();

  await screen.findAllByTestId("bird");

  const blueTit = screen.queryByRole("header", { name: /blue tit/i });
  const blueTitRemoveButton = await screen.findByTestId("removeButton-1");
  expect(blueTitRemoveButton).toBeInTheDocument();

  user.click(blueTitRemoveButton);

  await waitFor(() => {
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  const deleteButton = screen.getByRole("button", { name: /delete/i });
  expect(deleteButton).toBeInTheDocument();

  user.click(deleteButton);

  server.use(
    rest.get("http://localhost:3005/birds", (req, res, ctx) => {
      return res(ctx.json([{ id: "2", name: "grey heron", number: "1" }]));
    })
  );

  expect(blueTit).not.toBeInTheDocument();
});

test("updates sightings on add and subtract", async () => {
  renderComponent();

  await screen.findAllByTestId("bird");

  const minusButton = screen.getByTestId(`minus-1`);
  const plusButton = screen.getByTestId(`plus-1`);

  user.click(plusButton);

  server.use(
    rest.get("http://localhost:3005/birds", (req, res, ctx) => {
      return res(
        ctx.json([
          { id: "1", name: "blue tit", number: "6" },
          { id: "2", name: "grey heron", number: "1" },
        ])
      );
    })
  );

  await waitFor(() => {
    expect(screen.getByText(6)).toBeInTheDocument();
  });

  user.click(minusButton);

  server.use(
    rest.get("http://localhost:3005/birds", (req, res, ctx) => {
      return res(
        ctx.json([
          { id: "1", name: "blue tit", number: "5" },
          { id: "2", name: "grey heron", number: "1" },
        ])
      );
    })
  );

  await waitFor(() => {
    expect(screen.getByText(5)).toBeInTheDocument();
  });
});

test("sightings cannot go below one", async () => {
  renderComponent();

  await screen.findAllByTestId("bird");

  const minusButton = screen.getByTestId(`minus-2`);

  expect(screen.getByText("1")).toBeInTheDocument();

  user.click(minusButton);

  server.use(
    rest.get("http://localhost:3005/birds", (req, res, ctx) => {
      return res(
        ctx.json([
          { id: "1", name: "blue tit", number: "5" },
          { id: "2", name: "grey heron", number: "1" },
        ])
      );
    })
  );

  await waitFor(() => {
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
