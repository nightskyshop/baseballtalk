import Post from "@/components/Post";
import styles from "@/styles/default.module.css";
import ProfilePic from "@/public/누나닮은오리프사.jpg";
import ProfilePic2 from "@/public/프사2.jpg";
import ProfilePic3 from "@/public/프사3.jpg";

export default function PostDetail() {
  const post = {
    title: "야구 언제 개막함",
    content: "도파민이 부족해서 계속 2023 한국시리스 3차전 하이라이트 돌려보는 중...\n맨날욕해서미안해제발돌아와줘",
    author: {
      username: "Luna Kim",
      team: "LG Twins",
      profile__image: ProfilePic
    },
    likes: 13,
    chats: [
      {
        author: {
          username: "야구가뭐죠? 먹는건가요?",
          team: "LG Twins",
          profile__image: ProfilePic2
        },
        content: "인정...\n이제 결혼할 사람들은 다 결혼 한 것 같은데 슬슬 야구 시작하시죠"
      },
      {
        author: {
          username: "야구는9회말2아웃부터",
          team: "LG Twins",
          profile__image: ProfilePic3
        },
        content: "야구 내놔\n하도 비시즌이 길어서 조만간 축구 보러 옆동네 다녀와야겠다😅"
      }
    ]
  };

  const user = {
    username: "Luna Kim",
    team: "LG Twins",
    profile__image: ProfilePic
  };
  
  return (
    <main className={styles.main}>
      <Post post={post} user={user} />
    </main>
  )
}