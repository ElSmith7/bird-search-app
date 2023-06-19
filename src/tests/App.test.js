import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { rest } from "msw";
import { renderWithProviders } from "../utils/utils-for-tests";
import { setupServer } from "msw/lib/node";
import App from "../App";

jest.mock("../components/BirdImg", () => {
  return () => {
    return "Bird Img Component";
  };
});

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
  rest.post("http://localhost:3005/birds", (req, res, ctx) => {
    return res(ctx.json({ id: "3", name: "robin", number: "2" }));
  }),
  rest.delete("http://localhost:3005/birds/1", (req, res, ctx) => {
    return res(ctx.json({ id: "1", name: "blue tit", number: "5" }));
  }),
  rest.patch("http://localhost:3005/birds/1", (req, res, ctx) => {
    const updatedBird = { id: "1", name: "blue tit", number: req.text.number };
    if (req.text.number === "6") {
      return res(ctx.json([updatedBird]));
    } else {
      return res(ctx.json([{ id: "1", name: "blue tit", number: "5" }]));
    }
  }),
  rest.patch("http://localhost:3005/birds/2", (req, res, ctx) => {
    return res(ctx.json([{ id: "2", name: "grey heron", number: "1" }]));
  }),
];
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App", () => {
  test("displays the App's heading", async () => {
    renderWithProviders(<App />);
    await screen.findAllByTestId("bird");

    const heading = screen.getByRole("heading", { name: /bird search/i });

    expect(heading).toBeInTheDocument();
  });

  test("displays the search bird form", async () => {
    renderWithProviders(<App />);
    await screen.findAllByTestId("bird");

    const searchForm = screen.getByRole("textbox", { name: /bird/i });
    expect(searchForm).toBeInTheDocument();
  });

  describe("Bird List", () => {
    test("should fetch, load and display birdList", async () => {
      renderWithProviders(<App />);

      const loader = screen.queryByTestId("loader");

      expect(loader).toBeInTheDocument();

      const birdList = await screen.findAllByTestId("bird");

      expect(birdList).toHaveLength(2);
      expect(loader).not.toBeInTheDocument();
    });

    test("adds new bird on submit", async () => {
      renderWithProviders(<App />);

      const loader = screen.queryByTestId(/button loader/i);
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

      expect(loader).not.toBeInTheDocument();
      expect(await screen.findByRole("spinbutton")).toHaveValue(null);
      expect(await screen.findByRole("textbox")).toHaveValue("");

      expect(await screen.findByText(/robin/i)).toBeInTheDocument();
      expect(await screen.findByText(/2/i)).toBeInTheDocument();
    });

    test("removes correct bird on delete", async () => {
      renderWithProviders(<App />);
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
  });
  describe("Sightings", () => {
    test("updates sightings on add and subtract", async () => {
      renderWithProviders(<App />);
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
      renderWithProviders(<App />);
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
  });
});
