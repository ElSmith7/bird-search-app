import { useState, useEffect } from "react";
import { fetchBirdImg } from "../api/unsplash";
import LazyImg from "./LazyImg";

function BirdImg({ name }) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    async function fetchImg() {
      const results = await fetchBirdImg(name);
      if (results.length > 0) {
        setImgUrl(results[0].urls.thumb);
      }
    }
    fetchImg();
  }, [name]);

  return (
    <div className="w-2/3">
      <LazyImg src={imgUrl} height={3} width={2} />
    </div>
  );
}

export default BirdImg;
