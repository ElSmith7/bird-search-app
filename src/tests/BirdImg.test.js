import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/utils-for-tests";
import axios from "axios";

import BirdImg from "../components/BirdImg";

class IntersectionObserver {
  observe() {
    return null;
  }

  disconnect() {
    return null;
  }
}

window.IntersectionObserver = IntersectionObserver;

jest.mock("axios", () => ({
  get: jest.fn(),
}));

const mockResponse = {
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
test("shows the bird image", async () => {
  axios.get.mockResolvedValue(mockResponse);

  renderWithProviders(<BirdImg />);
  const birdImage = await screen.findByRole("img");
  expect(birdImage).toBeInTheDocument();
});
