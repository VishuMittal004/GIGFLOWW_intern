
import type { Metadata } from "next";
import { AppHeader } from "@/components/dashboard/AppHeader";
import { SalaryPageClient } from "@/components/salary/SalaryPageClient";

export const metadata: Metadata = {
  title: 'Salary - GigFloww',
  description: 'Manage salary activities and employee payroll details on GigFloww.',
};

export default function SalaryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 p-6 lg:p-8">
        <SalaryPageClient />
      </main>
    </div>
  );
}
