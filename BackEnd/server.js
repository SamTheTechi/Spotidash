require(`dotenv`).config();
require(`express-async-errors`);

const cors = require(`cors`);
const express = require(`express`);

const ConnectDB = require(`./DB/connect`);
const app = express();

const Oauth = require(`./router/Oauth`);
const api = require(`./router/Api`);
app.use(cors());
app.use(express.json());

app.use(`/`, Oauth);
app.use(`/api/v1`, api);

const port = process.env.PORT || 5000;
const Mongo_URL = process.env.Mongo_URL;

const Start = async () => {
  try {
    await ConnectDB(Mongo_URL);
    app.listen(port, async () => {
      console.log(`server is running on port ${port}...`);
    });
  } catch (e) {
    throw e;
  }
};

Start();
