import { useEffect, useRef, useState } from "react";
import { fetchBirdImg } from "../api/unsplash";
import { ClipLoader } from "react-spinners";

function BirdImg({ name }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchBirdImg(name).then((data) => {
            imgRef.current.src = data[0].urls.thumb;
            setLoaded(true);
          });

          observer.unobserve(imgRef.current);
        }
      });
    });

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [name]);

  let imgSrc;
  if (loaded) {
    imgSrc = { imgRef };
  } else if (loaded === false) {
    imgSrc = `https://via.placeholder.com/300x200?text=Loading...`;
  }

  return (
    <img
      ref={imgRef}
      onLoad={() => {
        setLoaded(true);
      }}
      src={imgSrc}
      alt={name}
    />
  );
}

export default BirdImg;
