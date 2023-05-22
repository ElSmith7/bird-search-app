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

test("renders bird image", async () => {
  axios.get.mockResolvedValueOnce(mockLoadedResponse);

  renderWithProviders(<BirdImg name="robin" />);
  mockAllIsIntersecting(true);
  const birdImage = await screen.findByRole("img");

  await waitFor(() => {
    expect(birdImage).toBeInTheDocument();
    expect(birdImage).toHaveAttribute(
      "src",
      "https://via.placeholder.com/300x300.png?text=robin"
    );
  });
});

test("green placeholder displays when loading", async () => {
  renderWithProviders(<BirdImg name="robin" />);

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
  renderWithProviders(<BirdImg name="robin" />);

  const placeholder = screen.getByTestId("background");
  expect(placeholder).toHaveStyle(`background: #22C55E`);

  axios.get.mockImplementationOnce(() => {
    throw 500;
  });
  mockAllIsIntersecting(true);

  const birdImage = screen.getByRole("img");
  await waitFor(() => {
    expect(birdImage).toHaveAttribute("src", "");
    expect(placeholder).toHaveStyle(`background: #ea580c`);
  });
});
