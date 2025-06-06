import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor?: string; // e.g., 'bg-purple-100'
  iconTextColor?: string; // e.g., 'text-purple-600'
  detailsLink?: string;
  onDetailsClick?: () => void;
  className?: string;
};

export function MetricCard({ // Renamed internally but exported as MetricCard to avoid breaking existing imports if any. Functionally it's a StatCard.
  title,
  value,
  icon: Icon,
  iconBgColor = "bg-purple-100",
  iconTextColor = "text-[#6B1E6E]",
  detailsLink,
  onDetailsClick,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("bg-white border border-[#E3EFFF] rounded-xl shadow-sm p-5", className)} style={{ minHeight: 180 }}>
      <div className="flex items-start justify-between mb-2">
        <div className="text-lg font-normal text-black" style={{ fontFamily: 'Varela Round, Inter, Arial, sans-serif' }}>
          {title}
        </div>
        <div className={cn("rounded-full flex items-center justify-center", iconBgColor)} style={{ width: 40, height: 40 }}>
          <Icon className={cn("h-6 w-6", iconTextColor)} />
        </div>
      </div>
      <div className="text-3xl font-bold text-black mb-4" style={{ fontFamily: 'Varela Round, Inter, Arial, sans-serif' }}>
        {value}
      </div>
      <div className="border-t border-[#E3EFFF] my-3" />
      {onDetailsClick ? (
        <button
          type="button"
          onClick={onDetailsClick}
          className="flex items-center text-[#2186C4] text-base font-normal hover:underline focus:outline-none"
          style={{ fontFamily: 'Varela Round, Inter, Arial, sans-serif' }}
        >
          View Details <ArrowRight className="ml-1 h-5 w-5" />
        </button>
      ) : detailsLink ? (
        <Link href={detailsLink} className="flex items-center text-[#2186C4] text-base font-normal hover:underline" style={{ fontFamily: 'Varela Round, Inter, Arial, sans-serif' }}>
          View Details <ArrowRight className="ml-1 h-5 w-5" />
        </Link>
      ) : null}
    </Card>
  );
}
