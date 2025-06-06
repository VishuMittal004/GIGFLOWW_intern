"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

export function NotificationBanner() {
  return (
    <div className="bg-white border border-[#E3EFFF] rounded-xl shadow-sm mb-6 mx-4 mt-[4px]" style={{ fontFamily: 'Varela Round, Inter, Arial, sans-serif', minHeight: '48px', display: 'flex', alignItems: 'center' }}>
      <div className="flex items-center gap-3 px-5 py-3">
        <div className="bg-[#E3F0FF] p-2 rounded-lg flex items-center justify-center">
          <Zap className="h-5 w-5 text-[#357ABD]" />
        </div>
        <p className="text-sm text-[#363C47]" style={{ fontFamily: 'Varela Round, Inter, Arial, sans-serif' }}>
          Optimize your experience on Gigfloww- track your job post, manage teams and streamline hr operations effortlessly today!
        </p>
      </div>
    </div>
  );
}
