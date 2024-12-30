import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let post = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
    </div>
  );
}