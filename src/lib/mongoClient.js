const { MongoClient, ServerApiVersion } = require("mongodb");

const user = process.env.MONGO_DB_USER;
const pwd = process.env.MONGO_DB_PWD;
const cluster = process.env.MONGO_DB_CLUSTER;

const uri = `mongodb+srv://${user}:${pwd}@${cluster}.ijinlse.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export default client;
