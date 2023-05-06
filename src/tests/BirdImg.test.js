import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/utils-for-tests";
import axios from "axios";
import BirdImg from "../components/BirdImg";
import { fetchBirdImg } from "../api/unsplash";

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
jest.mock("../api/unsplash", () => ({
  fetchBirdImg: jest.fn(),
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
test("shows the image", async () => {
  axios.get.mockResolvedValue(mockLoadedResponse);

  renderWithProviders(<BirdImg />);
  const birdImage = await screen.findByRole("img");
  console.log(birdImage);
  expect(birdImage).toBeInTheDocument();
});
describe("fetchBirdImg", () => {
  describe("when api call is successful", () => {
    it("should return the correct bird img", async () => {
      fetchBirdImg.mockResolvedValue(mockLoadedResponse);

      renderWithProviders(<BirdImg name="robin" />);

      const birdImage = screen.queryByRole("img");
      expect(birdImage.src).toBe(
        "https://via.placeholder.com/200x300/86efac?text=Loading..."
      );
      await waitFor(
        () => {
          expect(birdImage.src).not.toBe(
            "https://via.placeholder.com/200x300/86efac?text=Loading..."
          );
          expect(birdImage.src).toBe(
            mockLoadedResponse.data.results[0].urls.thumb
          );
        },
        { timeout: 4000 }
      );
    });
  });
});
