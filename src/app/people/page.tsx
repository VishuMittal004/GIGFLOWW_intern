
import type { Metadata } from "next";
import { AppHeader } from "@/components/dashboard/AppHeader";
import { PeoplePageClient } from "@/components/people/PeoplePageClient";

export const metadata: Metadata = {
  title: 'People - GigFloww',
  description: 'Manage your team members and their details on GigFloww.',
};

export default function PeoplePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 p-6 lg:p-8">
        <PeoplePageClient />
      </main>
    </div>
  );
}
