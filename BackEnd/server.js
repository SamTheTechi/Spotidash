require(`dotenv`).config();
const cors = require(`cors`);
const express = require(`express`);
const app = express();

const Oauth = require(`./router/Oauth`);

app.use(cors());

app.use(`/`, Oauth);

const port = process.env.LocalPort || process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`server is running on port ${port}...`);
});
