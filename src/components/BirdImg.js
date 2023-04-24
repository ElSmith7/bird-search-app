import { fetchBirdImg } from "../api/unsplash";

function BirdImg({ name }) {
  fetchBirdImg(name);
  return <div>{name}</div>;
}

export default BirdImg;
