import { MongoClient } from "mongodb";

const url =
  "mongodb://admin:admin1234@forum-shard-00-00.aclcd.mongodb.net:27017,forum-shard-00-01.aclcd.mongodb.net:27017,forum-shard-00-02.aclcd.mongodb.net:27017/?ssl=true&replicaSet=atlas-6p7vov-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Forum";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
