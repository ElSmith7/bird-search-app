import { screen, waitFor } from "@testing-library/react";
import { useInView } from "react-intersection-observer";
import {
  mockAllIsIntersecting,
  mockIsIntersecting,
  intersectionMockInstance,
} from "react-intersection-observer/test-utils";
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
  screen.debug();
});
