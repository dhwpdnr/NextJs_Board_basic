"use client";

import Link from "next/link";

export default function ListItem({ posts }) {
  return (
    <div>
      {posts.map((a, i) => {
        return (
          <div className="list-item" key={i}>
            <Link href={"/detail/" + posts[i]._id}>{posts[i].title}</Link>
            <Link href={"/edit/" + posts[i]._id} className="list-btn">
              ✏️
            </Link>
            <button
              onClick={(e) => {
                // fetch("/api/post/delete", {
                //   method: "DELETE",
                //   body: posts[i]._id,
                // })
                //   .then((r) => {
                //     return r.json();
                //   })
                //   .then((result) => {
                //     //성공시 실행할코드
                //     e.target.parentElement.style.opacity = 0;
                //     setTimeout(() => {
                //       e.target.parentElement.style.display = "none";
                //     }, 1000);
                //   });
                fetch("/api/post/delete/" + posts[i]._id, {
                  method: "DELETE",
                })
                  .then((r) => {
                    return r.json();
                  })
                  .then((result) => {
                    //성공시 실행할코드
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = "none";
                    }, 1000);
                  });
              }}
            >
              🗑️
            </button>
            <p>1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
