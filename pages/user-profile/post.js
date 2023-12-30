import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";
import Link from "next/link";
import styles from "@/styles/mypost.module.css";
import profile__styles from "@/styles/profile.module.css";
import Head from "next/head";

export default function MyPost() {
  const posts = [
    {
      id: 1,
      title: "야구 언제 개막함",
      content: "도파민이 부족해서 계속 2023 한국시리스 3차전 하이라이트 돌려보는 중...",
      team: "LG Twins",
      category: "야구 개막",
      tag: ["야구", "개막", "야구개막", "LG"],
      uid: 1
    },
    {
      id: 2,
      title: "엘튜브에 다큐 뜸!",
      content: "지금 엘튜브에서 덕아웃 직캠 확장판 생중계하고 있음. 선수들 인터뷰부터 코시 하이라이트 모아서 보여주고 있다는데??",
      team: "LG Twins",
      category: "야구 팀 유튜브",
      tag: ["LG", "엘튜브", "덕아웃", "직캠"],
      uid: 1
    },
    {
      id: 3,
      title: "야푸 추천 ㄱㄱ",
      content: "야구푸드 추천받아여 야구보면서 먹은 음식들 중에 승률 좋았던 음식으로 추천 부탁",
      team: "LG Twins",
      category: "직관",
      tag: ["음식", "야구", "야푸"],
      uid: 1
    }
  ];

  return (
    <main className={profile__styles.profile__main}>
      <Head>
        <title>내 계정 - 내가 작성한 글</title>
      </Head>

      <Navbar selected_btn={2} />
      <div className={styles.user__postlist}>
        <Link href="/post/create">글쓰기</Link>
        <PostList posts={posts} />
      </div>
    </main>
  )
};