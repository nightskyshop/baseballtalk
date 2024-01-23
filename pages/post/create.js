import PostForm from "@/components/PostForm";
import Head from "next/head";
import { useRouter } from "next/router";

export default function PostCreate() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("accessToken")) {
      router.push("/login");
    }
  }
  
  return (
    <div>
      <Head>
        <title>커뮤니티 글쓰기</title>
      </Head>

      <PostForm />
    </div>
  )
}