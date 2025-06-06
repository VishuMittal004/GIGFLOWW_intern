"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

export type ActionItem = { // Exporting for use in page.tsx
  timeRange: string;
  type: string;
  title: string;
};

// const actions: ActionItem[] = []; // This will now come from props


export function UpcomingActions({ actions }: { actions: ActionItem[] }) {
  return (
    <Card className="bg-white border border-[#E3EFFF] rounded-xl shadow-sm p-5 h-full flex flex-col justify-between" style={{ fontFamily: 'Varela Round, Inter, Arial, sans-serif' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-normal text-black">Upcoming Actions</div>
        <div className="bg-[#F3F2FD] rounded-full flex items-center justify-center" style={{ width: 40, height: 40 }}>
          <CalendarClock className="h-6 w-6 text-[#6B1E6E]" />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        {actions.map((action, index) => {
          const [start, end] = action.timeRange.split(' - ');
          return (
            <div key={index}>
              <div className="flex gap-4 items-stretch min-h-[56px]">
                <div className="flex flex-col justify-center min-w-[70px] pr-4">
                  <span className="text-lg font-medium text-black leading-none">{start}</span>
                  <span className="text-xs text-[#B0B0B0] leading-none mt-1">{end}</span>
                </div>
                <div className="border-l-2 border-[#D1D5DB] h-auto self-stretch" />
                <div className="flex flex-col justify-center flex-1">
                  <span className="text-xs text-[#B0B0B0] mb-1">{action.type}</span>
                  <span className="text-base text-black leading-snug">{action.title}</span>
                </div>
              </div>
              {index < actions.length - 1 && <div className="border-t border-[#E3EFFF] my-1" />}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
