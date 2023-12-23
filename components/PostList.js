import PostSummary from "./PostSummary";


export default function PostList({ posts }) {
  return (
    <div>
      {
        posts.map((post, index) => (
          <PostSummary post={post} index={index} />
        ))
      }
    </div>
  )
}