import Link from "next/link";

export default function PostSummary({ post, index }) {
  return (
    <div key={index}>
      <Link href={`/post/${post.id}`}>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>{post.uid}</p>
      </Link>
    </div>
  )
}