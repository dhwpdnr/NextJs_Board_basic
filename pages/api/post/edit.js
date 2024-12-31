import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "POST") {
    const db = (await connectDB).db("forum");
    let data = { title: request.body.title, content: request.body.content };
    let result = db
      .collection("post")
      .updateOne({ _id: new ObjectId(request.body._id) }, { $set: data });
    return response.status(200).redirect("/list");
  }
}
