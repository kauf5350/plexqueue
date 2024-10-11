'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'  // Add this import

export function Header() {
  const [user, setUser] = useState<User | null>(null);  // Update the type here

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  return (
    <header className="p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">PlexQueue</h1>
      <nav>
        {user ? (
          <>
            <Button variant="ghost" asChild className="text-[hsl(0,0%,98%)] hover:text-[hsl(0,0%,98%)] hover:bg-[hsl(240,3.7%,15.9%)]">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="ml-2 border-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] bg-[hsl(240,3.7%,15.9%)] hover:bg-[hsl(240,5%,26%)]">
              <Link href="/dashboard/new-request">New Request</Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild className="text-[hsl(0,0%,98%)] hover:text-[hsl(0,0%,98%)] hover:bg-[hsl(240,3.7%,15.9%)]">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button variant="outline" asChild className="ml-2 border-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] bg-[hsl(240,3.7%,15.9%)] hover:bg-[hsl(240,5%,26%)]">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </>
        )}
      </nav>
    </header>
  )
}