import { useEffect, useRef } from "react";
import { fetchBirdImg } from "../api/unsplash";

function BirdImg({ name }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchBirdImg(name).then((data) => {
            imgRef.current.src = data[0].urls.thumb;
          });
          observer.unobserve(imgRef.current);
        }
      });
    });

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [name]);

  return <img ref={imgRef} className=" h-30 w-20" alt={name} />;
}

export default BirdImg;
