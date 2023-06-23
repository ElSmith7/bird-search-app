export const birdImgMock = jest.mock("../../components/BirdImg", () => {
  return () => {
    return "Bird Img Component";
  };
});
