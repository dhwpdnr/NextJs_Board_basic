import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export default async function List() {
  let db = (await connectDB).db("forum");
  let posts = await db.collection("post").find().toArray();
  posts = JSON.parse(JSON.stringify(posts));

  return (
    <div className="list-bg">
      <ListItem posts={posts} />
    </div>
  );
}

// function ListItem(props) {
//   return (
//     <div className="list-item" key={props.key}>
//       <Link prefetch={false} href={"/detail/" + props.id}>
//         <h4>{props.title}</h4>
//       </Link>
//       <Link href={"/edit/" + props.id}>수정</Link>
//       <p>1월 1일</p>
//     </div>
//   );
// }
