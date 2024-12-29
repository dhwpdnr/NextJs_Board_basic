import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  let db = (await connectDB).db("forum");
  let posts = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {posts.map((item, i) => {
        return <ListItem title={item.title} key={i} id={item._id.toString()} />;
      })}
    </div>
  );
}

function ListItem(props) {
  return (
    <div className="list-item" key={props.key}>
      <Link prefetch={false} href={"/detail/" + props.id}>
        <h4>{props.title}</h4>
      </Link>
      <p>1월 1일</p>
    </div>
  );
}
