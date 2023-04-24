import axios from "axios";

async function fetchBirdImg(name) {
  const response = await axios.get(
    "https://api.unsplash.com/search/photos?per_page=1&orientation=portrait",

    {
      headers: {
        Authorization: "Client-ID 5PsYTLSHQtmbDPMDzBrgVtrP0yT_fZ8s2aoCzLzJa6c",
      },
      params: { query: `${name}` },
    }
  );
  return response.data.results;
}

export { fetchBirdImg };
