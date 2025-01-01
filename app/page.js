// revalidate 예약변수로 페이지 단위로 캐싱
export const revalidate = 60;

export default async function Home() {
  // 데이터 캐싱 함
  // await fetch("/url", { cache: "force-cache" });
  // 캐싱 안함
  // await fetch("/url", { cache: "no-store" });
  // 60초 마다 캐싱된 데이터 갱신
  // await fetch("/url", { next: { r evalidate: 60 } });

  // DB 출력 결과 캐싱

  return <div>Hello Next</div>;
}
