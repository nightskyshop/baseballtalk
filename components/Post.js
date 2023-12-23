import Link from "next/link";

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.uid}</p>
    </div>
  )
}