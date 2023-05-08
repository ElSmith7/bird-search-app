import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { decode } from "blurhash";
import { fetchBirdImg } from "../api/unsplash";
function BirdImg({ name }) {
  const [imgUrl, setImgUrl] = useState("");
  const [blurhash, setBlurhash] = useState("");

  useEffect(() => {
    async function fetchImg() {
      const results = await fetchBirdImg(name);
      if (results.length > 0) {
        setImgUrl(results[0].urls.thumb);
      }
    }
    fetchImg();
  }, [name]);

  useEffect(() => {
    async function fetchBlurHash() {
      const results = await fetchBirdImg(name);
      if (results.length > 0) {
        const pixels = decode(results[0].blur_hash, 32, 32);
        const placeholderCanvas = document.createElement("canvas");
        placeholderCanvas.width = 200;
        placeholderCanvas.height = 300;
        const ctx = placeholderCanvas.getContext("2d");
        const imageData = ctx.createImageData(32, 32);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
        setBlurhash(placeholderCanvas.toDataURL());
      }
    }
    fetchBlurHash();
  }, [name]);

  return (
    <div>
      <LazyLoadImage src={imgUrl} alt={name} placeholderSrc={blurhash} />
    </div>
  );
}

export default BirdImg;

// useEffect(() => {
//   async function fetchPlaceHolder() {
//     const results = await fetchBirdImg(name);
//     if (results.length > 0) {
//       setBlurhash(results[0].blur_hash);
//     }
//   }
//   fetchPlaceHolder();
// }, [name]);

//   return (
//     <div>
//       {blurhash && (
//         <LazyLoadImage
//           src={blurhash}
//           alt={name}
//           placeholderrc={<BlurhashCanvas hash={blurhash} width={200} />}
//         />
//       )}
//     </div>
//   );
// }
// export default BirdImg;

// import { useEffect, useRef, useState } from "react";
// import { fetchBirdImg } from "../api/unsplash";

// function BirdImg({ name }) {
//   const imgRef = useRef(null);
//   const [loaded, setLoaded] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           fetchBirdImg(name).then((data) => {
//             imgRef.current.src = data[0].urls.thumb;
//             setLoaded(true);
//           });

//           observer.unobserve(imgRef.current);
//         }
//       });
//     });

//     observer.observe(imgRef.current);

//     return () => observer.disconnect();
//   }, [name]);

//   let imgSrc;

//   if (loaded === false) {
//     imgSrc = `https://via.placeholder.com/200x300/86efac?text=Loading...`;
//   }
//   if (loaded) {
//     imgSrc = imgRef.current.src;
//   }
//   if (error === true) {
//     imgSrc = `https://via.placeholder.com/200x300/86efac?text=Error`;
//   }

//   return (
//     <img
//       ref={imgRef}
//       onLoad={() => {
//         setLoaded(true);
//       }}
//       onError={() => {
//         setError(true);
//       }}
//       src={imgSrc}
//       alt={name}
//       className="w-20"
//     />
//   );
// }

// export default BirdImg;
