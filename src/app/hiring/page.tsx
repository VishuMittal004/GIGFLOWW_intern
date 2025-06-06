
import type { Metadata } from "next";
import { AppHeader } from "@/components/dashboard/AppHeader";
import { HiringPageClient } from "@/components/hiring/HiringPageClient";

export const metadata: Metadata = {
  title: 'Hiring - GigFloww',
  description: 'Post jobs and manage your hiring process on GigFloww.',
};

export default function HiringPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 p-6 lg:p-8">
        <HiringPageClient />
      </main>
    </div>
  );
}
