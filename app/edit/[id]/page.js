import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const db = (await connectDB).db("forum");
  console.log("param !!!!!!!!");

  console.log(props);

  let post = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="p-20">
      <h4>수정 페이지</h4>
      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={post.title} />
        <input name="content" defaultValue={post.content} />
        <input
          style={{ display: "none" }}
          name="_id"
          defaultValue={post._id.toString()}
        />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
