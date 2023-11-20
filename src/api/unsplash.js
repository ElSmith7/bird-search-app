import axios from "axios";

async function fetchBirdImg(name) {
  const response = await axios.get(
    "https://api.unsplash.com/search/photos?per_page=1&orientation=portrait",

    {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
      },
      params: { query: `${name}` },
    }
  );
  return response.data.results;
}

export { fetchBirdImg };
