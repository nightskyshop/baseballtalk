import PostList from "@/components/PostList";
import { axioInstance } from "@/lib/axios";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  
  async function getPosts() {
    const p = await axios.get("http://localhost:8080/post");
    setPosts(p.data);
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <PostList posts={posts} />
  )
}