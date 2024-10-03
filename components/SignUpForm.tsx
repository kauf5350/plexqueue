import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signUpAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

export default function SignUpForm() {
  return (
    <Card className="w-full bg-[hsl(240,10%,3.9%)] border-[hsl(240,3.7%,15.9%)]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-[hsl(0,0%,98%)]">Create an account</CardTitle>
        <CardDescription className="text-center text-[hsl(0,0%,90%)]">
          Enter your details to create your account
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
                minLength={6}
                className="bg-[hsl(240,3.7%,15.9%)] border-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] placeholder-[hsl(240,5%,64.9%)]" 
              />
            </div>
            <SubmitButton formAction={signUpAction} pendingText="Signing up..." className="w-full bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]">
              Sign Up
            </SubmitButton>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <div className="text-sm text-[hsl(240,5%,64.9%)]">
          Already have an account?{" "}
          <Button variant="link" asChild className="text-[hsl(0,0%,98%)] hover:text-[hsl(0,0%,90%)] p-0">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}