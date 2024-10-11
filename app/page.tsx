'use client';

import { Film, Tv, Medal } from "lucide-react"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeatureCard } from "@/components/FeatureCard"
import { TweetTestimonial } from "@/components/TweetTestimonial"
import { Footer } from "@/components/Footer"
import Marquee from "react-fast-marquee"
import { useEffect, useState } from "react"
import { createBrowserClient } from '@supabase/ssr'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from '@supabase/supabase-js'  // Add this import

export default function Home() {
  const [user, setUser] = useState<User | null>(null);  // Update the type here
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);  // This should now work correctly
    };
    checkUser();
  }, [supabase.auth]);

  return (
    <div className="min-h-screen bg-[hsl(240,10%,3.9%)] text-[hsl(0,0%,98%)] flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <HeroSection />

        {user ? (
          <section className="text-center mb-16">
            <h2 className="text-2xl font-bold mb-4">Welcome back, {user.email}!</h2>
            <div className="flex justify-center space-x-4">
              <Button size="lg" asChild className="bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] bg-[hsl(240,3.7%,15.9%)] hover:bg-[hsl(240,5%,26%)]">
                <Link href="/dashboard/new-request">Make a New Request</Link>
              </Button>
            </div>
          </section>
        ) : null}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            Icon={Film}
            title="Movies"
            description="Request the latest blockbusters and timeless classics."
            neonColors={{ firstColor: "#ff00aa", secondColor: "#00FFF1" }}
          />
          <FeatureCard
            Icon={Tv}
            title="TV Shows"
            description="Binge-watch your favorite series or discover new ones."
            neonColors={{ firstColor: "#ff00aa", secondColor: "#00FFF1" }}
          />
          <FeatureCard
            Icon={Medal}
            title="Murder Cuddle Videos"
            description="Watch more BJJ instructionals than you ever thought possible."
            neonColors={{ firstColor: "#ff00aa", secondColor: "#00FFF1" }}
          />
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">What Our "Users" Are Saying</h3>
          <Marquee className="py-4" pauseOnHover={true} speed={40}>
            <div className="flex gap-4"> {/* Added gap between cards */}
              <TweetTestimonial
                quote="I've never seen a Plex server with so many obscure Romanian documentaries from the 1960s."
                author="Definitely Not David's Mom"
                username="totallynotdavid"
              />
              <TweetTestimonial
                quote="I requested 'Cats' and David added it within minutes. He's amazing."
                author="Matt Damon"
                username="matt_damon"
              />
              <TweetTestimonial
                quote="This Plex server has more content than the Library of Alexandria."
                author="History Buff"
                username="timeTraveler2023"
              />
              <TweetTestimonial
                quote="I f*cking love Jason Statham movies."
                author="Jason Statham"
                username="jason_statham"
              />
            </div>
          </Marquee>
        </section>
      </main>

      <Footer />
    </div>
  )
}