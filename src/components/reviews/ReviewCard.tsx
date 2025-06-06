
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from 'lucide-react';

export type Review = {
  id: string;
  reviewedPersonName: string;
  reviewedPersonAvatarUrl: string;
  dataAiHintReviewedPersonAvatar?: string;
  reviewedPersonJobTitle: string;
  department: string;
  reviewerName: string;
  reviewerAvatarUrl?: string; // Optional reviewer avatar
  dataAiHintReviewerAvatar?: string;
  reviewerTitle: string;
  rating: number; // 1 to 5
  reviewDate: string;
  reviewText: string;
  fullReviewLink: string;
};

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${
            i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="shadow-sm border hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={review.reviewedPersonAvatarUrl} alt={review.reviewedPersonName} data-ai-hint={review.dataAiHintReviewedPersonAvatar || "person professional"}/>
            <AvatarFallback>{review.reviewedPersonName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">{review.reviewedPersonName}</CardTitle>
            <p className="text-sm text-muted-foreground">{review.reviewedPersonJobTitle}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
          <p className="text-xs text-muted-foreground">{review.reviewDate}</p>
        </div>
        
        <p className="text-sm text-foreground leading-relaxed line-clamp-3">{review.reviewText}</p>
        
        <div className="flex items-center gap-2 pt-1">
          {review.reviewerAvatarUrl && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={review.reviewerAvatarUrl} alt={review.reviewerName} data-ai-hint={review.dataAiHintReviewerAvatar || "person professional"}/>
              <AvatarFallback>{review.reviewerName.substring(0,1)}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="text-xs font-medium text-foreground">{review.reviewerName}</p>
            <p className="text-xs text-muted-foreground">{review.reviewerTitle}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <Button variant="link" asChild className="p-0 h-auto text-sm font-medium text-primary hover:text-primary/80">
          <Link href={review.fullReviewLink}>
            View Full Review <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
