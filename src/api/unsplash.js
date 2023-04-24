import axios from "axios";

async function fetchBirdImg(name) {
  const response = await axios.get(
    "https://api.unsplash.com/search/photos?per_page=1&orientation=landscape",

    {
      headers: {
        Authorization: "Client-ID 5PsYTLSHQtmbDPMDzBrgVtrP0yT_fZ8s2aoCzLzJa6c",
      },
      params: { query: `${name}` },
    }
  );
  console.log(response.data.results);
}

export { fetchBirdImg };
