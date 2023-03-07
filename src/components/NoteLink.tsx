import { Link, useRoute } from "wouter";

function NoteLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isActive] = useRoute(href)

  return (
    <Link href={href}>
      <a className={"group" + (isActive ? " active" : "")}>{children}</a>
    </Link>
  )
}

export default NoteLink

