import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardContent } from "@/components/DashboardContent";
import { Footer } from "@/components/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[hsl(240,10%,3.9%)] text-[hsl(0,0%,98%)] flex flex-col">
      <DashboardHeader />
      <DashboardContent />
      <Footer />
    </div>
  );
}