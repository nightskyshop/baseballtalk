import { useRouter } from "next/router"

export default function Logout() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
      router.reload();
    }

    router.push("/");
  }

  return (
    <div>logout</div>
  )
}