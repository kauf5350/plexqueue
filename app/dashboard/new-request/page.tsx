import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function NewRequestPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[hsl(240,10%,3.9%)] text-[hsl(0,0%,98%)] flex flex-col">
      <h1 className="text-3xl font-bold mb-8">New Request</h1>
      {/* Add your form or content for new requests here */}
      <p>This is where users can make new requests.</p>
    </div>
  );
}