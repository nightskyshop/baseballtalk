import Link from "next/link";

export default function Header() {
  return (
    <div>
      <ul>
        <li><Link href="/post">게시판</Link></li>

        <li><Link href="/post/create">게시판 글쓰기</Link></li>

        <li><Link href="/data-referance">데이터 자료실</Link></li>

      </ul>
    </div>
  )
}