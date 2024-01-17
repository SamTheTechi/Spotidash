require(`dotenv`).config();
const express = require(`express`);
const app = express();

app.get(`/`, (req, res) => {
  res.send(`hello there`);
});

const port = 5000 || process.env.PORT;

app.listen(port);
