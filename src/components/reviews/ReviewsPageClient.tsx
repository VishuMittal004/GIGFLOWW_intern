
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, SlidersHorizontal, Search, Star, MessageSquare, ThumbsUp, ThumbsDown, CalendarDays, UserCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ReviewCard, type Review } from "./ReviewCard";

const reviewsData: Review[] = [
  {
    id: "1",
    reviewedPersonName: "Sarah Johnson",
    reviewedPersonAvatarUrl: "https://i.pravatar.cc/48?u=sarah-johnson",
    dataAiHintReviewedPersonAvatar: "woman smiling",
    reviewedPersonJobTitle: "Software Engineer",
    department: "Engineering",
    reviewerName: "Michael Lee",
    reviewerAvatarUrl: "https://i.pravatar.cc/24?u=michael-lee",
    dataAiHintReviewerAvatar: "man professional",
    reviewerTitle: "Engineering Manager",
    rating: 5,
    reviewDate: "May 20, 2025",
    reviewText: "Sarah consistently delivers high-quality code and is a great team player. Her problem-solving skills are top-notch and she always goes the extra mile to help her colleagues. A true asset to the team.",
    fullReviewLink: "#review1",
  },
  {
    id: "2",
    reviewedPersonName: "David Kim",
    reviewedPersonAvatarUrl: "https://i.pravatar.cc/48?u=david-kim",
    dataAiHintReviewedPersonAvatar: "man glasses",
    reviewedPersonJobTitle: "Product Designer",
    department: "Design",
    reviewerName: "Emily Carter",
    reviewerAvatarUrl: "https://i.pravatar.cc/24?u=emily-carter",
    dataAiHintReviewerAvatar: "woman professional",
    reviewerTitle: "Lead Designer",
    rating: 4,
    reviewDate: "May 18, 2025",
    reviewText: "David has a great eye for detail and user experience. He consistently produces innovative designs. Sometimes needs to manage his time better on larger projects but overall a strong performer.",
    fullReviewLink: "#review2",
  },
  {
    id: "3",
    reviewedPersonName: "Jessica Brown",
    reviewedPersonAvatarUrl: "https://i.pravatar.cc/48?u=jessica-brown",
    dataAiHintReviewedPersonAvatar: "woman professional",
    reviewedPersonJobTitle: "Marketing Specialist",
    department: "Marketing",
    reviewerName: "Robert Green",
    reviewerTitle: "Marketing Director",
    rating: 3,
    reviewDate: "May 15, 2025",
    reviewText: "Jessica is creative and brings fresh ideas to campaigns. She meets expectations but could improve on analytical reporting and tracking KPIs more closely for her projects. Potential for growth is there.",
    fullReviewLink: "#review3",
  },
   {
    id: "4",
    reviewedPersonName: "Kevin Garcia",
    reviewedPersonAvatarUrl: "https://i.pravatar.cc/48?u=kevin-garcia",
    dataAiHintReviewedPersonAvatar: "man smiling",
    reviewedPersonJobTitle: "Data Analyst",
    department: "Data",
    reviewerName: "Laura White",
    reviewerAvatarUrl: "https://i.pravatar.cc/24?u=laura-white",
    dataAiHintReviewerAvatar: "woman glasses",
    reviewerTitle: "Senior Data Scientist",
    rating: 5,
    reviewDate: "May 22, 2025",
    reviewText: "Kevin's analytical skills are exceptional. He has a knack for finding valuable insights in complex datasets and presenting them clearly. He's proactive and always eager to learn new technologies.",
    fullReviewLink: "#review4",
  },
];


const uniqueDepartments = ["All Departments", ...new Set(reviewsData.map(review => review.department))];

export function ReviewsPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all-departments');
  const [filterDateRange, setFilterDateRange] = useState('last-6-months');
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const [tempFilterDepartment, setTempFilterDepartment] = useState(filterDepartment);
  const [tempFilterDateRange, setTempFilterDateRange] = useState(filterDateRange);
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>(reviewsData);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [newReviewData, setNewReviewData] = useState({
    employeeName: '',
    reviewer: '',
    reviewDate: '',
    rating: 0,
    comments: '',
    department: '', // Added department to form state
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewReviewData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value, 10) : value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewReviewData(prev => ({ ...prev, [name]: value }));
  };



  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePopoverOpenChange = (open: boolean) => {
    if (open) {
      // When popover opens, sync temp filters with actual filters
      setTempFilterDepartment(filterDepartment);
      setTempFilterDateRange(filterDateRange);
    }
    setIsFilterPopoverOpen(open);
  };

  const handleApplyFilters = () => {
    setFilterDepartment(tempFilterDepartment);
    setFilterDateRange(tempFilterDateRange);
    setIsFilterPopoverOpen(false);
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `rev-${Date.now()}`;
    const newReviewToAdd: Review = {
      id: newId,
      reviewedPersonName: newReviewData.employeeName || 'N/A',
      reviewedPersonAvatarUrl: `https://placehold.co/48x48.png/CCCCCC/000000?text=${newReviewData.employeeName.charAt(0) || 'P'}`, 
      dataAiHintReviewedPersonAvatar: 'profile picture',
      reviewedPersonJobTitle: 'N/A', // Placeholder, consider adding to form
      department: newReviewData.department || 'N/A', // Added department
      reviewerName: newReviewData.reviewer || 'N/A',
      reviewerAvatarUrl: `https://placehold.co/24x24.png/EEEEEE/000000?text=${newReviewData.reviewer.charAt(0) || 'R'}`, 
      dataAiHintReviewerAvatar: 'profile picture',
      reviewerTitle: 'N/A', // Placeholder, consider adding to form
      rating: newReviewData.rating || 0,
      reviewDate: newReviewData.reviewDate ? new Date(newReviewData.reviewDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      reviewText: newReviewData.comments || '',
      fullReviewLink: `#${newId}`,
    };

    setDisplayedReviews(prevReviews => [newReviewToAdd, ...prevReviews]);
    setIsAddReviewModalOpen(false);
    setNewReviewData({
      employeeName: '',
      reviewer: '',
      reviewDate: '',
      rating: 0,
      comments: '',
      department: '', // Reset department
    });
  };

  const filteredReviews = React.useMemo(() => {
    return displayedReviews.filter(review => {
      // Search term filter (name, job title, review text)
      const term = searchTerm.toLowerCase();
      const searchMatch = (
        review.reviewedPersonName.toLowerCase().includes(term) ||
        review.reviewedPersonJobTitle.toLowerCase().includes(term) ||
        review.reviewText.toLowerCase().includes(term) ||
        review.reviewerName.toLowerCase().includes(term)
      );

      // Department filter
      const departmentMatch = filterDepartment === 'all-departments' || review.department === filterDepartment;

      // Date range filter
      let dateMatch = true;
      if (filterDateRange !== 'all-time') {
        const reviewDateObj = new Date(review.reviewDate);
        const now = new Date();
        let startDate = new Date();

        if (filterDateRange === 'last-6-months') {
          startDate.setMonth(now.getMonth() - 6);
        } else if (filterDateRange === 'last-12-months') {
          startDate.setFullYear(now.getFullYear() - 1);
        }
        dateMatch = reviewDateObj >= startDate && reviewDateObj <= now;
      }

      return searchMatch && departmentMatch && dateMatch;
    });
  }, [displayedReviews, searchTerm, filterDepartment, filterDateRange]);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Performance Reviews</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Dialog open={isAddReviewModalOpen} onOpenChange={setIsAddReviewModalOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] text-white">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-card">
              <DialogHeader>
                <DialogTitle>Add New Performance Review</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new performance review.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddReviewSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="employeeName" className="text-right">
                      Employee
                    </Label>
                    <Input id="employeeName" name="employeeName" value={newReviewData.employeeName} onChange={handleInputChange} className="col-span-3 bg-input" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reviewer" className="text-right">
                      Reviewer
                    </Label>
                    <Input id="reviewer" name="reviewer" value={newReviewData.reviewer} onChange={handleInputChange} className="col-span-3 bg-input" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Select name="department" value={newReviewData.department} onValueChange={(value) => handleSelectChange('department', value)}>
                      <SelectTrigger id="department" className="col-span-3 bg-input">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border text-foreground">
                        {uniqueDepartments.filter(dept => dept !== 'All Departments').map(dept => (
                          <SelectItem key={dept} value={dept} className="hover:bg-muted/50 focus:bg-muted/50">
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reviewDate" className="text-right">
                      Date
                    </Label>
                    <Input id="reviewDate" name="reviewDate" type="date" value={newReviewData.reviewDate} onChange={handleInputChange} className="col-span-3 bg-input" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="rating" className="text-right">
                      Rating (1-5)
                    </Label>
                    <Input id="rating" name="rating" type="number" min="1" max="5" value={newReviewData.rating === 0 ? '' : newReviewData.rating} onChange={handleInputChange} className="col-span-3 bg-input" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="comments" className="text-right">
                      Comments
                    </Label>
                    <Textarea id="comments" name="comments" value={newReviewData.comments} onChange={handleInputChange} className="col-span-3 bg-input" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddReviewModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Review</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Popover open={isFilterPopoverOpen} onOpenChange={handlePopoverOpenChange}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-card hover:bg-muted text-foreground w-full sm:w-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Advanced Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-card border-border shadow-lg rounded-md p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department-filter" className="text-sm font-medium text-muted-foreground">Department</Label>
                <Select value={tempFilterDepartment} onValueChange={setTempFilterDepartment}>
                  <SelectTrigger id="department-filter" className="w-full bg-input border-border text-foreground">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    {uniqueDepartments.map(dept => (
                      <SelectItem key={dept} value={dept === 'All Departments' ? 'all-departments' : dept} className="hover:bg-muted/50 focus:bg-muted/50">
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-range-filter" className="text-sm font-medium text-muted-foreground">Date Range</Label>
                <Select value={tempFilterDateRange} onValueChange={setTempFilterDateRange}>
                  <SelectTrigger id="date-range-filter" className="w-full bg-input border-border text-foreground">
                    <SelectValue placeholder="Select Date Range" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    <SelectItem value="last-6-months" className="hover:bg-muted/50 focus:bg-muted/50">Last 6 months</SelectItem>
                    <SelectItem value="last-12-months" className="hover:bg-muted/50 focus:bg-muted/50">Last 12 months</SelectItem>
                    <SelectItem value="all-time" className="hover:bg-muted/50 focus:bg-muted/50">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <Button onClick={handleApplyFilters} className="w-full">Apply Filters</Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-auto flex-grow sm:flex-grow-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search reviews (e.g. by name, title, text)" className="pl-10 w-full sm:w-[320px] md:w-[400px] bg-card" value={searchTerm} onChange={handleSearchChange} />
        </div>
        {/* Department and Date Range Selects are now inside the Popover */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      
      {reviewsData.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-foreground">No Reviews Yet</h3>
          <p className="text-muted-foreground mt-2">Start by adding a new performance review.</p>
        </div>
      )}
    </div>
  );
}
