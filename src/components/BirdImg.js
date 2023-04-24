import { useState, useEffect } from "react";
import { fetchBirdImg } from "../api/unsplash";

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
  }, []);

  return <img src={imgUrl} alt={`${name} bird`} />;
}

export default BirdImg;
