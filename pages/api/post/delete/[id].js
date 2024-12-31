import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    console.log(request.query);

    const db = (await connectDB).db("forum");
    let result = db
      .collection("post")
      .deleteOne({ _id: new ObjectId(request.query.id) });

    return response.status(200).json("삭제완료");
  }
}
