import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3005/birds", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: "1", name: "blue tit", number: "5" },
        { id: "2", name: "grey heron", number: "1" },
      ])
    );
  }),
  rest.post("http://localhost:3005/birds", (req, res, ctx) => {
    return res(ctx.json({ id: "3", name: "robin", number: "2" }));
  }),
  rest.delete("http://localhost:3005/birds/1", (req, res, ctx) => {
    return res(ctx.json({ id: "1", name: "blue tit", number: "5" }));
  }),
  rest.patch("http://localhost:3005/birds/1", (req, res, ctx) => {
    const updatedBird = { id: "1", name: "blue tit", number: req.text.number };
    if (req.text.number === "6") {
      return res(ctx.json([updatedBird]));
    } else {
      return res(ctx.json([{ id: "1", name: "blue tit", number: "5" }]));
    }
  }),
  rest.patch("http://localhost:3005/birds/2", (req, res, ctx) => {
    return res(ctx.json([{ id: "2", name: "grey heron", number: "1" }]));
  }),
];
