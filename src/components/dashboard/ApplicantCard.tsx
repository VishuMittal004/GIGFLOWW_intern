"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Applicant = {
  id: string;
  name: string;
  avatarUrl: string;
  dataAiHintAvatar?: string;
  experience: string;
  latestCompanyLogoUrl: string;
  dataAiHintLogo?: string;
  latestCompanyName: string;
  latestExperienceDate: string;
  resumeLink: string;
};

type ApplicantCardProps = {
  applicant: Applicant;
  onViewResumeClick?: (applicant: Applicant) => void;
};

export function ApplicantCard({ applicant, onViewResumeClick }: ApplicantCardProps) {
  return (
    <Card className="bg-white border border-[#E3EFFF] rounded-xl shadow-sm p-4 flex flex-col justify-between min-h-[220px]">
      <div className="flex items-start gap-3 mb-2">
        <Avatar className="h-12 w-12 rounded-md">
          <AvatarImage src={applicant.avatarUrl} alt={applicant.name} data-ai-hint={applicant.dataAiHintAvatar || "person professional"}/>
          <AvatarFallback>{applicant.name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <h3 className="text-base font-bold text-black leading-tight mb-0.5">{applicant.name}</h3>
          <p className="text-xs text-[#7C7C7C]">{applicant.experience}</p>
        </div>
      </div>
      <div className="mb-2 mt-2">
        <p className="text-sm font-medium text-[#7C7C7C] mb-1">Latest Experience</p>
        <div className="flex items-center gap-2">
          <Image 
            src={applicant.latestCompanyLogoUrl} 
            alt={`${applicant.latestCompanyName} logo`} 
            width={28} 
            height={28} 
            className="rounded-md"
            data-ai-hint={applicant.dataAiHintLogo || "company logo"}
          />
          <div>
            <p className="text-sm font-bold text-black leading-tight">{applicant.latestCompanyName}</p>
            <p className="text-xs text-[#7C7C7C]">{applicant.latestExperienceDate}</p>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-2 border-t border-[#E3EFFF]">
        {onViewResumeClick ? (
          <button 
            type="button"
            onClick={() => onViewResumeClick(applicant)}
            className="flex items-center text-[#2186C4] text-base font-normal hover:underline pt-2 focus:outline-none w-full text-left"
          >
            View Resume <ArrowRight className="ml-1 h-5 w-5" />
          </button>
        ) : (
          <Link href={applicant.resumeLink} className="flex items-center text-[#2186C4] text-base font-normal hover:underline pt-2">
            View Resume <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        )}
      </div>
    </Card>
  );
}

