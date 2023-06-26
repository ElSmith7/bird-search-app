import { screen, waitFor } from "@testing-library/react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { act } from "@testing-library/react";
import axios from "axios";
import { renderWithProviders } from "../utils/utils-for-tests";
import BirdImg from "../components/BirdImg";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

const mockLoadedResponse = {
  data: {
    results: [
      {
        urls: {
          thumb: "https://via.placeholder.com/300x300.png?text=robin",
        },
      },
    ],
  },
};

function renderComponent() {
  renderWithProviders(<BirdImg name="robin" />);
}

test("renders bird image", async () => {
  axios.get.mockResolvedValueOnce(mockLoadedResponse);

  renderComponent();
  mockAllIsIntersecting(true);
  const birdImage = screen.getByRole("img");

  await waitFor(() => {
    expect(birdImage).toBeInTheDocument();
    expect(birdImage).toHaveAttribute(
      "src",
      "https://via.placeholder.com/300x300.png?text=robin"
    );
  });
});

test("green placeholder displays when loading", async () => {
  renderComponent();

  const placeholder = screen.getByTestId("background");
  expect(placeholder).toHaveStyle(`background: #22C55E`);

  axios.get.mockResolvedValueOnce(mockLoadedResponse);
  mockAllIsIntersecting(true);

  const birdImage = screen.getByRole("img");
  await waitFor(() => {
    expect(birdImage).toBeInTheDocument();
  });
});

test("orange placeholder displays on api error", async () => {
  renderComponent();

  axios.get.mockImplementationOnce(() => {
    throw 500;
  });

  mockAllIsIntersecting(true);

  await waitFor(() => {
    expect(screen.getByTestId("background")).toHaveStyle(`background: #ea580c`);
  });
  const birdImage = screen.getByRole("img");
  expect(birdImage).toHaveAttribute("src", "");
});
