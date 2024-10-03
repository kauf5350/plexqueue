import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">PlexQueue</h1>
      <nav>
        <Button variant="ghost" asChild className="text-[hsl(0,0%,98%)] hover:text-[hsl(0,0%,98%)] hover:bg-[hsl(240,3.7%,15.9%)]">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button variant="outline" asChild className="ml-2 border-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] bg-[hsl(240,3.7%,15.9%)] hover:bg-[hsl(240,5%,26%)]">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </nav>
    </header>
  )
}