const express = require("express");

const BlogRouter = require("./data/api_reuter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {res.send('this is a blog');});

server.use("/api/posts", BlogRouter);

server.listen(4000, () => {
  console.log("\n*** Running on http://localhost:4000 ***\n");
});