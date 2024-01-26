require(`dotenv`).config();
const cors = require(`cors`);
const express = require(`express`);
const app = express();
const axios = require("axios");

const Oauth = require(`./router/Oauth`);
const api = require(`./router/Api`);

app.use(cors());
app.use(express.json());

app.use(`/`, Oauth);
app.use(`/api/v1`, api);

const port = process.env.LocalPort || process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`server is running on port ${port}...`);
});
