import { useState, useEffect } from "react";
import { fetchBirdImg } from "../api/unsplash";
import LazyImg from "./LazyImg";

function BirdImg({ name }) {
  const [imgUrl, setImgUrl] = useState("");
  const [color, setColor] = useState("22C55E");

  useEffect(() => {
    async function fetchImg() {
      try {
        const results = await fetchBirdImg(name);
        if (results.length > 0) {
          setImgUrl(results[0].urls.thumb);
        }
      } catch (error) {
        setColor("ea580c");
      }
    }
    fetchImg();
  }, [name]);

  return (
    <div className="w-2/3">
      <LazyImg src={imgUrl} height={3} width={2} color={color} />
    </div>
  );
}

export default BirdImg;
