import default_styles from "@/styles/default.module.css";
import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;
  console.log(user);

  return (
    <div>
      <Head>
        <title>BaseballTalk</title>
      </Head>
      
      <h1>Initial Setting</h1>
    </div>
  )
}