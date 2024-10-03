import Link from "next/link";
import { Footer } from "./Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[hsl(240,10%,3.9%)] text-[hsl(0,0%,98%)] flex flex-col">
      <header className="w-full p-6 flex justify-center items-center">
        <Link href="/" className="text-2xl font-bold">PlexQueue</Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}