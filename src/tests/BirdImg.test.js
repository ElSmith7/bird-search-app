import { screen, waitFor } from "@testing-library/react";
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

  renderWithProviders(<BirdImg name="robin" />);
  const birdImage = await screen.findByRole("img");

  await waitFor(() => {
    expect(birdImage).toBeInTheDocument();
    expect(birdImage).toHaveAttribute(
      "src",
      "https://via.placeholder.com/300x300.png?text=robin"
    );
  });
});
