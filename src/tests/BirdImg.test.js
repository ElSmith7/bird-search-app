import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/utils-for-tests";
import axios from "axios";
import { useInView } from "react-intersection-observer";
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

test("shows the image", async () => {
  axios.get.mockResolvedValue(mockLoadedResponse);

  // let intersectionCallback;
  // const observeMock = jest.fn().mockImplementation((callback) => {
  //   intersectionCallback = callback;
  // });
  // const disconnectMock = jest.fn();

  // window.IntersectionObserver = jest.fn((callback) => ({
  //   observe: observeMock,
  //   disconnect: disconnectMock,
  // }));

  renderWithProviders(<BirdImg name="robin" />);
  const birdImage = await screen.findByRole("img");

  await waitFor(() => {
    expect(birdImage).toBeInTheDocument();
    expect(birdImage).toHaveAttribute(
      "src",
      "https://via.placeholder.com/300x300.png?text=robin"
    );
  });

  // intersectionCallback([{ isIntersecting: true, target: birdImage }]);
});

// import { screen, waitFor } from "@testing-library/react";
// import { renderWithProviders } from "../utils/utils-for-tests";
// import axios from "axios";
// import BirdImg from "../components/BirdImg";

// jest.mock("axios", () => ({
//   get: jest.fn(),
// }));

// const mockLoadedResponse = {
//   data: {
//     results: [
//       {
//         urls: {
//           thumb: "https://via.placeholder.com/300x300.png?text=robin",
//         },
//       },
//     ],
//   },
// };

// test("shows the image", async () => {
//   axios.get.mockResolvedValue(mockLoadedResponse);
//   const observeMock = jest.fn().mockImplementation((callback) => {
//     const entry = {
//       isIntersecting: true,
//       target: {
//         getBoundingClientRect: () => ({
//           bottom: 0,
//           height: 0,
//           left: 0,
//           right: 0,
//           top: 0,
//           width: 0,
//         }),
//       },
//     };
//     callback([entry]);
//   });
//   const disconnectMock = jest.fn();
//   const callback = jest.fn((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         observeMock(entry.target);
//       }
//     });
//   });

//   window.IntersectionObserver = jest.fn((callback) => ({
//     observe: observeMock,
//     disconnect: disconnectMock,
//   }));

//   renderWithProviders(<BirdImg name="robin" />);
//   const birdImage = await screen.findByRole("img");

//   await waitFor(() => {
//     expect(birdImage).toBeInTheDocument();
//     expect(birdImage).toHaveAttribute(
//       "src",
//       "https://via.placeholder.com/300x300.png?text=robin"
//     );
//   });
// });
