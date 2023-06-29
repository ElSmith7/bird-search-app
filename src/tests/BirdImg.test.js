import { screen, waitFor } from "@testing-library/react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
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
  await axios.get.mockResolvedValueOnce(mockLoadedResponse);

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

  await axios.get.mockResolvedValueOnce(mockLoadedResponse);
  mockAllIsIntersecting(true);

  const birdImage = screen.getByRole("img");
  await waitFor(() => {
    expect(birdImage).toBeInTheDocument();
  });
});

test("orange placeholder displays on API error", async () => {
  renderComponent();

  await axios.get.mockRejectedValueOnce(new Error("API error"));

  mockAllIsIntersecting(true);

  await waitFor(() => {
    expect(screen.getByTestId("background")).toHaveStyle(`background: #ea580c`);
  });
  const birdImage = screen.getByRole("img");
  expect(birdImage).toHaveAttribute("src", "");
});
