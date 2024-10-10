import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, CheckCircle } from "lucide-react";

export function DashboardContent() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back, nerd!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-[hsl(240,10%,3.9%)] border-[hsl(240,3.7%,15.9%)]">
          <CardHeader>
            <CardTitle className="text-[hsl(0,0%,98%)] flex items-center">
              <PlusCircle className="mr-2" />
              New Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[hsl(240,5%,64.9%)] mb-4">
              Submit requests for new content to be added to the Plex server.
            </p>
            <Button className="w-full bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]" asChild>
              <Link href="/dashboard/new-request">Make a New Request</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(240,10%,3.9%)] border-[hsl(240,3.7%,15.9%)]">
          <CardHeader>
            <CardTitle className="text-[hsl(0,0%,98%)] flex items-center">
              <CheckCircle className="mr-2" />
              Submitted Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[hsl(240,5%,64.9%)] mb-4">
              View the status of your submitted content requests.
            </p>
            <Button className="w-full bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]">
              View Submitted Requests
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}