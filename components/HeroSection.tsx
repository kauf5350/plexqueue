import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from '@supabase/supabase-js'

interface HeroSectionProps {
  user: User | null;
}

export function HeroSection({ user }: HeroSectionProps) {
  return (
    <section className="text-center mb-16">
      <h2 className="text-4xl font-extrabold mb-4">David's Plex Server</h2>
      <p className="text-xl text-[hsl(240,5%,64.9%)] mb-8">The ultimate in home entertainment</p>
      <div className="flex justify-center space-x-4">
        {user ? (
          <>
            <Button size="lg" asChild className="bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] bg-[hsl(240,3.7%,15.9%)] hover:bg-[hsl(240,5%,26%)]">
              <Link href="/dashboard/new-request">Make a New Request</Link>
            </Button>
          </>
        ) : (
          <>
            <Button size="lg" asChild className="bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] bg-[hsl(240,3.7%,15.9%)] hover:bg-[hsl(240,5%,26%)]">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </section>
  )
}