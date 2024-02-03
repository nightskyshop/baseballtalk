import Link from "next/link"

export default function TeamList({ teams }) {
  console.log(teams);

  return(
    <div>
      {
        teams.map((team) => (
          <Link href={`/team/${team.id}`}>
            <h1>{team.teamname}</h1>
          </Link>
        ))
      }
    </div>
  )
}