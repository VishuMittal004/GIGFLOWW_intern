
import type { Metadata } from "next";
import { AppHeader } from "@/components/dashboard/AppHeader";
import { ReviewsPageClient } from "@/components/reviews/ReviewsPageClient";

export const metadata: Metadata = {
  title: 'Reviews - GigFloww',
  description: 'Manage and view performance reviews on GigFloww.',
};

export default function ReviewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 p-6 lg:p-8">
        <ReviewsPageClient />
      </main>
    </div>
  );
}
