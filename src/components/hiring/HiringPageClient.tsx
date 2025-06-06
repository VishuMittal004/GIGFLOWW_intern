"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from "@/components/ui/dialog";

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  status: string;
  views: number;
  applicants: number;
  logoUrl: string;
  dataAiHintLogo?: string; // Optional
  // Add other fields from the form if they need to be part of the JobPosting object
  skills?: string[];
  experience?: string;
  employmentType?: string;
  workplaceType?: string;
  stipend?: string;
  openings?: string;
  jobDescription?: string;
  links?: string;
}

const initialJobPostings: JobPosting[] = [
  {
    id: "1",
    title: "UI Designer Intern (Remote)",
    company: "Article studio",
    location: "Bangalore, India",
    status: "Under applying (posted 12/02/24)",
    views: 24,
    applicants: 106,
    logoUrl: "https://picsum.photos/seed/joblogo_1/56",
    dataAiHintLogo: "company logo N",
  },
  {
    id: "2",
    title: "Software Engineer (Frontend)",
    company: "Tech Solutions Inc.",
    location: "San Francisco, USA",
    status: "Accepting Applications (posted 10/01/24)",
    views: 150,
    applicants: 32,
    logoUrl: "https://picsum.photos/seed/joblogo_2/56",
    dataAiHintLogo: "company logo T",
  },
];

const initialFormState = {
  role: "",
  company: "",
  location: "",
  skills: "", // For Select, this will be the selected value string
  experience: "",
  employmentType: "",
  workplaceType: "",
  stipend: "",
  openings: "",
  jobDescription: "",
  links: "",
};

const FormInputGroup = ({ label, placeholder, children, isSelect, name, options, value, onChange, onValueChange }: { 
  label: string; 
  placeholder?: string; 
  children?: React.ReactNode; 
  isSelect?: boolean; 
  name: string; 
  options?: {value: string, label: string}[];
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onValueChange?: (value: string) => void;
}) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">{label}</label>
      {isSelect ? (
        <Select name={name} value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-full bg-card border-border focus:ring-primary">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            {!options && <SelectItem value="placeholder" disabled>{placeholder}</SelectItem>}
          </SelectContent>
        </Select>
      ) : children ? (
        // For Textarea, React.cloneElement can pass props. Ensure children is a single React element.
        React.isValidElement(children) ? React.cloneElement(children, { id: name, name, placeholder, className: `${children.props.className} bg-card border-border focus:ring-primary`, value, onChange } as any) : children
      ) : (
        <Input id={name} name={name} placeholder={placeholder} className="bg-card border-border focus:ring-primary" value={value} onChange={onChange} />
      )}
    </div>
  );
};

const InputWithIcon = ({ label, name, placeholder, value, onChange }: { 
  label: string; 
  name: string; 
  placeholder: string; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="text-sm font-medium text-foreground">{label}</label>
    <div className="relative">
      <Input id={name} name={name} placeholder={placeholder} className="bg-card border-border focus:ring-primary pr-10" value={value} onChange={onChange} />
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
    </div>
  </div>
);


const sampleJobDescriptions = [
  "We are looking for a motivated UI/UX Designer to create engaging and user-friendly digital experiences. The ideal candidate will have a strong portfolio showcasing their skills in wireframing, prototyping, and visual design. Responsibilities include collaborating with product managers and engineers to define and implement innovative solutions.",
  "Join our dynamic team as a Frontend Developer! You will be responsible for developing and maintaining web applications using modern JavaScript frameworks like React or Vue. A keen eye for detail and a passion for creating seamless user interfaces are essential. Experience with responsive design and RESTful APIs is a plus.",
  "Seeking an experienced Backend Engineer proficient in Node.js and database management (SQL/NoSQL). You will design and implement scalable server-side logic, APIs, and database schemas. Strong problem-solving skills and experience with cloud platforms (AWS, Azure, GCP) are highly desirable.",
  "Our company is hiring a Marketing Specialist to develop and execute comprehensive marketing strategies. This role involves market research, content creation, SEO/SEM, social media management, and campaign analysis. Excellent communication skills and a proven track record of successful marketing campaigns are required.",
  "We need a proactive Project Manager to oversee software development projects from conception to delivery. Responsibilities include defining project scope, managing timelines and resources, and ensuring stakeholder satisfaction. PMP certification or equivalent experience is preferred."
];

export function HiringPageClient() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(initialJobPostings);
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePostJob = () => {
    const newJob: JobPosting = {
      id: Date.now().toString(), // Simple unique ID
      title: formData.role,
      company: formData.company,
      location: formData.location,
      skills: formData.skills ? [formData.skills] : [], // Assuming single select for now
      experience: formData.experience,
      employmentType: formData.employmentType,
      workplaceType: formData.workplaceType,
      stipend: formData.stipend,
      openings: formData.openings,
      jobDescription: formData.jobDescription,
      links: formData.links,
      status: "Accepting Applications (Newly Posted)",
      views: 0,
      applicants: 0,
      logoUrl: `https://picsum.photos/seed/${formData.company.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substring(2, 7)}/56`,
    };
    setJobPostings(prev => [newJob, ...prev]);
    setFormData(initialFormState); // Reset form
  };

  const handleAiWriteJobDescription = () => {
    const randomIndex = Math.floor(Math.random() * sampleJobDescriptions.length);
    const randomDescription = sampleJobDescriptions[randomIndex];
    setFormData(prev => ({ ...prev, jobDescription: randomDescription }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Job Posting Form */}
      <div className="flex-1 lg:w-2/3 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Job Posting</h1>
          <p className="text-sm text-muted-foreground">Post Job for free. Add details for your job post</p>
        </div>

        <h2 className="text-2xl font-semibold text-foreground underline">Fill in Job Details</h2>

        <div className="space-y-6">
          <FormInputGroup label="Role" name="role" placeholder="e.g UI/UX Designer" value={formData.role} onChange={handleInputChange} />
          <FormInputGroup label="Company Name" name="company" placeholder="e.g Article Studio" value={formData.company} onChange={handleInputChange} />
          <FormInputGroup label="Location" name="location" placeholder="e.g Bangalore, India" value={formData.location} onChange={handleInputChange} />
          
          <FormInputGroup 
            label="Skill(s) Required" 
            name="skills" 
            isSelect 
            placeholder="Enter required skill(s)" 
            options={[{value: "uiux", label: "UI/UX Design"}, {value: "react", label: "React"}, {value: "node", label: "Node.js"}]}
            value={formData.skills}
            onValueChange={(value) => handleSelectChange('skills', value)}
          />

          <FormInputGroup 
            label="Years of Experience/Experience Level" 
            name="experience" 
            isSelect 
            placeholder="e.g 0-2 years"
            options={[{value: "0-2", label: "0-2 years"}, {value: "2-5", label: "2-5 years"}, {value: "5+", label: "5+ years"}]}
            value={formData.experience}
            onValueChange={(value) => handleSelectChange('experience', value)}
          />
          
          <FormInputGroup 
            label="Employment Type" 
            name="employmentType" 
            isSelect 
            placeholder="e.g Full time"
            options={[{value: "full-time", label: "Full-time"}, {value: "part-time", label: "Part-time"}, {value: "contract", label: "Contract"}]}
            value={formData.employmentType}
            onValueChange={(value) => handleSelectChange('employmentType', value)}
          />

          <FormInputGroup 
            label="Workplace Type" 
            name="workplaceType" 
            isSelect 
            placeholder="e.g Hybrid"
            options={[{value: "hybrid", label: "Hybrid"}, {value: "remote", label: "Remote"}, {value: "on-site", label: "On-site"}]}
            value={formData.workplaceType}
            onValueChange={(value) => handleSelectChange('workplaceType', value)}
          />
          
          <InputWithIcon label="Stipend" name="stipend" placeholder="Enter the payment per month" value={formData.stipend} onChange={handleInputChange} />
          
          <InputWithIcon label="No of Opening (if it is more than 1 one)" name="openings" placeholder="e.g 2" value={formData.openings} onChange={handleInputChange} />

          <FormInputGroup label="Job Description" name="jobDescription" value={formData.jobDescription} onChange={handleInputChange}>
            <Textarea rows={5} />
          </FormInputGroup>

          <FormInputGroup label="Relevant Link(s)" name="links" placeholder="Enter link" value={formData.links} onChange={handleInputChange} />

          <Button 
            onClick={handlePostJob} 
            className="w-full bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] text-white font-semibold py-3"
          >
            Post Job
          </Button>
        </div>
      </div>

      {/* Right Column: Manage Posting & AI Writer */}
      <div className="lg:w-[380px] flex-shrink-0 space-y-6">
        <Card className="bg-card shadow-sm border-border">
          <CardHeader className="flex flex-row justify-between items-center pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">Manage Posting</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-primary hover:underline focus:outline-none">See all</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] bg-card">
                <DialogHeader>
                  <DialogTitle className="text-foreground">All Job Postings</DialogTitle>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto p-1 pr-3 space-y-4 my-4 scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-muted">
                  {jobPostings.length > 0 ? (
                    jobPostings.map((job) => (
                      <div key={job.id} className="p-4 border border-border rounded-lg shadow-sm bg-background hover:shadow-md transition-shadow">
                        <h5 className="font-semibold text-md text-foreground">{job.title}</h5>
                        <p className="text-sm text-muted-foreground">{job.company} - {job.location}</p>
                        <p className="text-xs text-muted-foreground mt-1">Status: {job.status}</p>
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>Applicants: {job.applicants}</span>
                          <span>Views: {job.views}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No job postings available.</p>
                  )}
                </div>
                <DialogFooter className="border-t border-border pt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobPostings.slice(0, 3).map((job) => (
              <div key={job.id} className="bg-white flex items-start gap-4 p-6 border border-gray-200 rounded-2xl shadow-lg">
                <Image src={job.logoUrl} alt="Company Logo" width={56} height={56} className="rounded-lg flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-black mb-1">{job.title}</h4>
                  <p className="text-sm text-gray-700 mb-0.5">{job.company}</p>
                  <p className="text-sm text-gray-700 mb-3">{job.location}</p>
                  <p className="text-sm text-gray-500 mb-4">{job.status}</p>
                  <Separator className="my-4 bg-gray-200 w-full" />
                  <div className="flex justify-between w-full mt-4">
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-bold text-black">{job.views}</span>
                      <span className="text-sm text-gray-600 mt-0.5">Views</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-bold text-black">{job.applicants}</span>
                      <span className="text-sm text-gray-600 mt-0.5">Applicants</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-3">
              <Image 
                src="https://picsum.photos/seed/ai-assistant-illustration/180/100" 
                alt="AI writing assistant illustration" 
                width={180} 
                height={100}
                data-ai-hint="AI writing assistant"
              />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-1">
              Use AI to write
            </h4>
            <Separator className="my-2 bg-muted" />
            <p className="text-sm text-muted-foreground mb-3 text-left">
              Write perfectly and flawless with AI. If you want help with job description and other fields, AI will suggest for you.
            </p>
            <Button onClick={handleAiWriteJobDescription} className="w-full bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] text-white font-semibold">Write with AI</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}