import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInForm({ searchParams }: { searchParams: Message }) {
  return (
    <Card className="w-full max-w-md bg-[hsl(240,10%,3.9%)] border-[hsl(240,3.7%,15.9%)]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-[hsl(0,0%,98%)]">Sign in to your account</CardTitle>
        <CardDescription className="text-center text-[hsl(0,0%,90%)]">
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[hsl(0,0%,98%)]">Email</Label>
              <Input 
                id="email" 
                name="email"
                placeholder="you@example.com" 
                required 
                type="email" 
                className="bg-[hsl(240,3.7%,15.9%)] border-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] placeholder-[hsl(240,5%,64.9%)]" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[hsl(0,0%,98%)]">Password</Label>
              <Input 
                id="password" 
                name="password"
                placeholder="Your password"
                required 
                type="password" 
                className="bg-[hsl(240,3.7%,15.9%)] border-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] placeholder-[hsl(240,5%,64.9%)]" 
              />
            </div>
            <SubmitButton formAction={signInAction} pendingText="Signing in..." className="w-full bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]">
              Sign In
            </SubmitButton>
          </div>
        </form>
        <FormMessage message={searchParams} />
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <Button variant="link" asChild className="text-[hsl(240,5%,64.9%)] hover:text-[hsl(0,0%,98%)]">
          <Link href="/forgot-password">Forgot password?</Link>
        </Button>
        <div className="text-sm text-[hsl(240,5%,64.9%)]">
          Don't have an account?{" "}
          <Button variant="link" asChild className="text-[hsl(0,0%,98%)] hover:text-[hsl(0,0%,90%)] p-0">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}