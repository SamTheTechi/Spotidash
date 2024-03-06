require(`dotenv`).config();
require(`express-async-errors`);

const helmet = require(`helmet`);
const cors = require(`cors`);
const express = require(`express`);

const port = process.env.PORT || process.env.LOCALPORT;
const MONGO_ATLAS = process.env.MONGO_ATLAS;
const MONGO_URL = process.env.MONGO_URL;

const ConnectDB = require(`./DB/connect`);
const app = express();

const Oauth = require(`./router/Oauth`);
const api = require(`./router/Api`);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(`/`, Oauth);
app.use(`/api/v1`, api);

const Start = async () => {
  try {
    ConnectDB(MONGO_ATLAS);
    app.listen(port, async () => {
      console.log(`server is running on port ${port}...`);
    });
  } catch (e) {
    throw e;
  }
};

Start();
