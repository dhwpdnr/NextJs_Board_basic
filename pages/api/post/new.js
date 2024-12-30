import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method == "POST") {
    if (request.body.title == "") {
      return response.status(500).json("제목을 입력해주세요");
    }
    try {
      let db = (await connectDB).db("forum");
      let result = db.collection("post").insertOne(request.body);
      return response.redirect(302, "/list");
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
