'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { useRouter } from 'next/navigation';

export function DashboardHeader() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutAction();
    router.push('/');
  };

  return (
    <header className="p-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        PlexQueue
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-10 h-10 rounded-full p-0 bg-[hsl(240,3.7%,15.9%)] hover:bg-[hsl(240,5%,26%)] focus:outline-none"
          >
            <UserCircle className="h-8 w-8 text-[hsl(0,0%,98%)]" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-[hsl(240,10%,3.9%)] border-[hsl(240,3.7%,15.9%)]"
        >
          <DropdownMenuLabel className="text-[hsl(0,0%,98%)]">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[hsl(240,3.7%,15.9%)]" />
          <DropdownMenuItem className="text-[hsl(0,0%,98%)] focus:bg-[hsl(240,3.7%,15.9%)] focus:text-[hsl(0,0%,98%)]">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-[hsl(0,0%,98%)] focus:bg-[hsl(240,3.7%,15.9%)] focus:text-[hsl(0,0%,98%)]">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[hsl(240,3.7%,15.9%)]" />
          <DropdownMenuItem 
            className="text-[hsl(0,0%,98%)] focus:bg-[hsl(240,3.7%,15.9%)] focus:text-[hsl(0,0%,98%)]"
            onSelect={(event) => {
              event.preventDefault();
              handleSignOut();
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}