require(`dotenv`).config();
require(`express-async-errors`);

const cors = require(`cors`);
const express = require(`express`);
const session = require(`express-session`);
const cookie = require(`cookie-parser`);
const { createClient } = require(`redis`);
const RedisStore = require('connect-redis').default;

const port = process.env.PORT || process.env.LOCALPORT;
const MONGO_ATLAS = process.env.MONGO_ATLAS;
const MONGO_URL = process.env.Mongo_URL;

const ConnectDB = require(`./DB/connect`);
const app = express();

const Oauth = require(`./router/Oauth`);
const api = require(`./router/Api`);

app.use(cookie());
app.use(cors());
app.use(express.json());

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'myapp:',
});

app.use(
  session({
    secret: 'AreYouMaggi?CozICreaveYouAllTheTime',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30,
    },
    store: redisStore,
  })
);

app.use(`/`, Oauth);
app.use(`/api/v1`, api);

const Start = async () => {
  try {
    ConnectDB(MONGO_URL);
    app.listen(port, async () => {
      console.log(`server is running on port ${port}...`);
    });
  } catch (e) {
    throw e;
  }
};

Start();
