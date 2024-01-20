require(`dotenv`).config();
const express = require(`express`);
const app = express();

app.get(`/login`, (req, res) => {
  res.send(`hello there`);
});

const port = process.env.LocalPort || process.env.PORT;

app.listen(port, () => console.log(`Server Running on port ${port}`));
