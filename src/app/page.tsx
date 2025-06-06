"use client";

import { AppHeader } from "@/components/dashboard/AppHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { UpcomingActions, type ActionItem } from "@/components/dashboard/UpcomingActions";
import { Users, UsersRound, Presentation, CalendarDays, SlidersHorizontal, Zap, CalendarIcon } from "lucide-react"; // Added CalendarIcon for Popover
import { NotificationBanner } from "@/components/dashboard/NotificationBanner";
import { PerformanceReportChart } from "@/components/dashboard/PerformanceReportChart";
import { ApplicantCard, type Applicant } from "@/components/dashboard/ApplicantCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';

// Mock data for Employees modal
interface DashboardEmployee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatarUrl: string;
}

// This will be replaced by useState initialization further down in the component function body
const initialMockDashboardEmployees: DashboardEmployee[] = Array.from({ length: 24 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Employee ${i + 1}`,
  position: i % 3 === 0 ? 'Software Engineer' : i % 3 === 1 ? 'Product Manager' : 'UX Designer',
  department: i % 4 === 0 ? 'Engineering' : i % 4 === 1 ? 'Product' : i % 4 === 2 ? 'Design' : 'Marketing',
  avatarUrl: `https://i.pravatar.cc/40?u=employee${i + 1}`,
}));

// Mock data for Hiring modal
interface HiringData {
  id: string;
  candidateName: string;
  role: string;
  status: 'Interview' | 'Offer' | 'Pending';
}
const mockHiringData: HiringData[] = Array.from({ length: 5 }, (_, i) => ({
  id: `h${i + 1}`,
  candidateName: `Candidate ${i + 1}`,
  role: i % 2 === 0 ? 'Frontend Developer' : 'Backend Developer',
  status: i % 3 === 0 ? 'Interview' : i % 3 === 1 ? 'Offer' : 'Pending',
}));

// Mock data for Projects modal
interface ProjectData {
  id: string;
  projectName: string;
  status: 'Active' | 'Planning' | 'Completed';
  teamSize: number;
}
const mockProjectsData: ProjectData[] = Array.from({ length: 1 }, (_, i) => ({
  id: `p${i + 1}`,
  projectName: `Project Alpha ${i + 1}`,
  status: i === 0 ? 'Active' : 'Planning',
  teamSize: 5 + i * 2,
}));

const applicants: Applicant[] = [
  { id: "1", name: "Elizabeth Filade", avatarUrl: "https://i.pravatar.cc/48?u=elizabeth-filade", dataAiHintAvatar: "woman professional", experience: "3 years in Software Development", latestCompanyLogoUrl: "https://picsum.photos/seed/tuckerinc_1/24", dataAiHintLogo:"company logo abstract", latestCompanyName: "Tucker Inc", latestExperienceDate: "12 Dec 2024 - 10 May 2025", resumeLink: "#" },
  { id: "2", name: "Andre Suares", avatarUrl: "https://i.pravatar.cc/48?u=andre-suares", dataAiHintAvatar: "man professional", experience: "3 years in Software Development", latestCompanyLogoUrl: "https://picsum.photos/seed/tuckerinc_2/24", dataAiHintLogo:"company logo letter", latestCompanyName: "Tucker Inc", latestExperienceDate: "12 Dec 2024 - 10 May 2025", resumeLink: "#" },
  { id: "3", name: "Ishita Ashuth", avatarUrl: "https://i.pravatar.cc/48?u=ishita-ashuth-smiling", dataAiHintAvatar: "woman smiling", experience: "3 years in Software Development", latestCompanyLogoUrl: "https://picsum.photos/seed/tuckerinc_3/24", dataAiHintLogo:"company logo minimal", latestCompanyName: "Tucker Inc", latestExperienceDate: "12 Dec 2024 - 10 May 2025", resumeLink: "#" },
  { id: "4", name: "Ishita Ashuth", avatarUrl: "https://i.pravatar.cc/48?u=ishita-ashuth-professional", dataAiHintAvatar: "woman professional", experience: "3 years in Software Development", latestCompanyLogoUrl: "https://picsum.photos/seed/tuckerinc_4/24", dataAiHintLogo:"company logo tech", latestCompanyName: "Tucker Inc", latestExperienceDate: "12 Dec 2024 - 10 May 2025", resumeLink: "#" },
];

export default function GigflowwDashboardPage() {
  const router = useRouter();
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [isHiringModalOpen, setHiringModalOpen] = useState(false);
  const [isProjectsModalOpen, setProjectsModalOpen] = useState(false);
  const [isResumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isAllApplicantsModalOpen, setAllApplicantsModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [displayedActions, setDisplayedActions] = useState<ActionItem[]>([]);
  const [dashboardEmployees, setDashboardEmployees] = useState<DashboardEmployee[]>(initialMockDashboardEmployees);
  const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPosition, setNewMemberPosition] = useState('');
  const [newMemberDepartment, setNewMemberDepartment] = useState('');
  const [employeeDisplayCount, setEmployeeDisplayCount] = useState<number>(initialMockDashboardEmployees.length);

  const allMockActions: ActionItem[] = [
    { timeRange: "09:00 am - 09:30 am", type: "Standup", title: "Daily Standup with Development Team" },
    { timeRange: "10:00 am - 11:00 am", type: "Client Call", title: "Call with Acme Corp - Project Update" },
    { timeRange: "11:30 am - 12:00 pm", type: "Review", title: "Design Review with UI/UX Team" },
    { timeRange: "01:00 pm - 02:00 pm", type: "Planning", title: "Sprint Planning Session - Q3 Goals" },
    { timeRange: "02:30 pm - 03:00 pm", type: "1-on-1", title: "1-on-1 with Sarah (Marketing)" },
    { timeRange: "03:30 pm - 04:30 pm", type: "Internal Meeting", title: "Internal Meeting with Jade Sapphire - UI designer" },
    { timeRange: "05:00 pm - 05:30 pm", type: "Internal Meeting", title: "Internal Meeting with Content team" },
    { timeRange: "07:00 pm - 07:30 pm", type: "Interview", title: "Interview with Achyut - UI intern" },
    { timeRange: "08:00 am - 08:45 am", type: "Focus Time", title: "Code Review - Feature X" },
    { timeRange: "12:30 pm - 01:00 pm", type: "Quick Sync", title: "Sync with DevOps on Deployment" },
    { timeRange: "04:00 pm - 04:30 pm", type: "Presentation Prep", title: "Prepare Slides for Friday Demo" },
    { timeRange: "06:00 pm - 06:45 pm", type: "Learning", title: "Webinar: Advanced TypeScript Techniques" },
  ];

  const updateUpcomingActions = () => {
    const shuffled = [...allMockActions].sort(() => 0.5 - Math.random());
    setDisplayedActions(shuffled.slice(0, 7)); // Display 7 random actions
  };

  const handleViewResumeClick = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setResumeModalOpen(true);
  };

  useEffect(() => {
    updateUpcomingActions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]); // Re-run when selectedDate changes

  useEffect(() => {
    // Initialize count from localStorage on mount
    const storedCount = localStorage.getItem('employeeCount');
    if (storedCount && !isNaN(parseInt(storedCount, 10))) {
      setEmployeeDisplayCount(parseInt(storedCount, 10));
    } else {
      // Fallback if no stored count or invalid
      setEmployeeDisplayCount(initialMockDashboardEmployees.length);
    }

    // Listen for storage changes to update the count dynamically
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'employeeCount' && event.newValue && !isNaN(parseInt(event.newValue, 10))) {
        setEmployeeDisplayCount(parseInt(event.newValue, 10));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('userLoggedIn');
      if (isLoggedIn !== 'true') {
        router.push('/register');
      }
    }
  }, [router]); // router is a dependency. Effect runs on mount and if router instance changes.

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // updateUpcomingActions(); // This is now handled by the useEffect above
      // Consider closing popover if not automatic, though shadcn Calendar usually handles this well within Popover
    }
  };

  const handleAddMember = () => {
    if (!newMemberName.trim() || !newMemberPosition.trim() || !newMemberDepartment.trim()) {
      alert("Please fill in all member details.");
      return;
    }
    const newId = `emp-${Date.now()}`; 
    const newEmployee: DashboardEmployee = {
      id: newId,
      name: newMemberName.trim(),
      position: newMemberPosition.trim(),
      department: newMemberDepartment.trim(),
      avatarUrl: `https://i.pravatar.cc/40?u=${newId}` // Placeholder avatar
    };
    setDashboardEmployees(prevEmployees => {
      const updatedEmployees = [...prevEmployees, newEmployee];
      localStorage.setItem('employeeCount', updatedEmployees.length.toString());
      // Directly update employeeDisplayCount here for immediate reflection
      setEmployeeDisplayCount(updatedEmployees.length);
      return updatedEmployees;
    });
    setNewMemberName('');
    setNewMemberPosition('');
    setNewMemberDepartment('');
    setAddMemberModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 p-6 lg:p-8 space-y-6">
        <NotificationBanner />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Welcome Back, Nuraj group
          </h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-auto justify-start text-left font-normal bg-card border px-3 py-1.5 rounded-lg shadow-sm text-sm text-muted-foreground hover:bg-muted hover:text-muted-foreground focus:ring-0 focus:ring-offset-0 h-auto"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "EEE, MMM dd, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Dialog open={isEmployeeModalOpen} onOpenChange={setEmployeeModalOpen}>
              <MetricCard
                    title="Employees"
                    value={employeeDisplayCount.toString()}
                    icon={Users}
                    iconBgColor="bg-purple-100 dark:bg-purple-900"
                    iconTextColor="text-purple-600 dark:text-purple-400"
                    onDetailsClick={() => setEmployeeModalOpen(true)}
                  />
                <DialogContent className="sm:max-w-[500px] max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Employees ({dashboardEmployees.length})</DialogTitle>
                    <DialogDescription>
                      List of all employees in the company.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="overflow-y-auto pr-2" style={{ maxHeight: '60vh' }}>
                    <div className="space-y-4 py-4">
                      {dashboardEmployees.map((employee) => (
                        <div key={employee.id} className="flex items-center gap-4 p-2 border-b last:border-b-0">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                            <AvatarFallback>{employee.name.substring(0, 1)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm text-foreground">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">{employee.position} - {employee.department}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-between">
                    <Button 
                      onClick={() => { console.log('Add new member button clicked, setting isAddMemberModalOpen to true'); setAddMemberModalOpen(true); }} 
                      className="bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] text-white font-semibold px-4 py-2 rounded-md h-auto text-sm order-1 sm:order-none mt-2 sm:mt-0"
                    >
                      Add new member
                    </Button>
                    <Button variant="outline" onClick={() => setEmployeeModalOpen(false)} className="order-2 sm:order-none">Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={isHiringModalOpen} onOpenChange={setHiringModalOpen}>
              <MetricCard
                title="Hiring"
                value="5"
                icon={UsersRound}
                iconBgColor="bg-sky-100 dark:bg-sky-900"
                iconTextColor="text-sky-600 dark:text-sky-400"
                onDetailsClick={() => setHiringModalOpen(true)}
              />
              <DialogContent className="sm:max-w-[500px] max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Hiring (5)</DialogTitle>
                  <DialogDescription>
                    Current hiring pipeline status.
                  </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto pr-2" style={{ maxHeight: '60vh' }}>
                  <div className="space-y-4 py-4">
                    {mockHiringData.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4 p-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium text-sm text-foreground">{item.candidateName}</p>
                          <p className="text-xs text-muted-foreground">{item.role}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${item.status === 'Interview' ? 'bg-blue-100 text-blue-700' : item.status === 'Offer' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setHiringModalOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isProjectsModalOpen} onOpenChange={setProjectsModalOpen}>
              <MetricCard
                title="Projects"
                value="1"
                icon={Presentation}
                iconBgColor="bg-emerald-100 dark:bg-emerald-900"
                iconTextColor="text-emerald-600 dark:text-emerald-400"
                onDetailsClick={() => setProjectsModalOpen(true)}
              />
              <DialogContent className="sm:max-w-[500px] max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Projects (1)</DialogTitle>
                  <DialogDescription>
                    Current project status.
                  </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto pr-2" style={{ maxHeight: '60vh' }}>
                  <div className="space-y-4 py-4">
                    {mockProjectsData.map((project) => (
                      <div key={project.id} className="flex items-center justify-between gap-4 p-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium text-sm text-foreground">{project.projectName}</p>
                          <p className="text-xs text-muted-foreground">Team Size: {project.teamSize}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${project.status === 'Active' ? 'bg-green-100 text-green-700' : project.status === 'Planning' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{project.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setProjectsModalOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            </div>

            {/* Performance Report */}
            <PerformanceReportChart />
          </div>

          {/* Right Sidebar content */}
          <div className="lg:col-span-1">
            <UpcomingActions actions={displayedActions} />
          </div>
        </div>
        
        {/* Incoming Applications */}
        <div className="mt-6">
          <div className="bg-white border border-[#E3EFFF] rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-bold text-black leading-tight">Incoming Application</h2>
                <p className="text-sm text-[#7C7C7C]">Manage application for your job posting</p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={() => setFilterModalOpen(true)} className="bg-white border border-[#E3EFFF] text-black font-medium px-6 py-2 rounded-lg flex items-center gap-2 shadow-none hover:bg-muted h-10">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button onClick={() => setAllApplicantsModalOpen(true)} className="bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] text-white font-semibold px-6 py-2 rounded-lg shadow-none flex items-center gap-2 h-10">See all Applicants</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {applicants.map((applicant) => (
                <ApplicantCard key={applicant.id} applicant={applicant} onViewResumeClick={handleViewResumeClick} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Resume Modal */}
      {selectedApplicant && (
        <Dialog open={isResumeModalOpen} onOpenChange={setResumeModalOpen}>
          <DialogContent className="max-w-md bg-white p-6 rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Varela Round, sans-serif' }}>{selectedApplicant.name}</DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mb-4">
                Candidate Details
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarImage src={selectedApplicant.avatarUrl} alt={selectedApplicant.name} />
                  <AvatarFallback>{selectedApplicant.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Experience:</span> {selectedApplicant.experience}</p>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Latest Role:</span> {selectedApplicant.latestCompanyName}</p>
                  <p className="text-sm text-gray-500">{selectedApplicant.latestExperienceDate}</p>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Varela Round, sans-serif' }}>Skills Required (for this role)</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">
                  <li>React</li>
                  <li>TypeScript</li>
                  <li>Node.js</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Varela Round, sans-serif' }}>Candidate's Skills</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">
                  <li>JavaScript (Expert)</li>
                  <li>Python (Intermediate)</li>
                  <li>SQL (Advanced)</li>
                  <li>Communication (Excellent)</li>
                  <li>Problem Solving</li>
                </ul>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Varela Round, sans-serif' }}>Resume Link (Fallback)</h4>
                <a 
                  href={selectedApplicant.resumeLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:underline"
                >
                  {selectedApplicant.resumeLink === "#" ? "No direct link provided" : selectedApplicant.resumeLink}
                </a>
              </div>

            </div>

            <DialogFooter className="mt-6">
              <Button onClick={() => setResumeModalOpen(false)} variant="outline" className="w-full sm:w-auto">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* All Applicants Modal */}
      <Dialog open={isAllApplicantsModalOpen} onOpenChange={setAllApplicantsModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] bg-white p-0 rounded-lg shadow-xl">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Varela Round, sans-serif' }}>All Applicants ({applicants.length})</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Browse all candidates who have applied.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 140px)' }}> {/* Adjust max height considering header/footer */}
            {applicants.map((applicant) => (
              <div key={applicant.id} className="flex items-center justify-between gap-4 p-3 border rounded-md hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-md">
                    <AvatarImage src={applicant.avatarUrl} alt={applicant.name} />
                    <AvatarFallback>{applicant.name.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{applicant.name}</p>
                    <p className="text-xs text-gray-500">{applicant.experience}</p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAllApplicantsModalOpen(false); // Close this modal first
                    handleViewResumeClick(applicant); // Then open the specific resume modal
                  }}
                  className="text-xs"
                >
                  View Resume
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter className="p-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setAllApplicantsModalOpen(false)} className="w-full sm:w-auto">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Applicants Modal */}
      <Dialog open={isFilterModalOpen} onOpenChange={setFilterModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-0 rounded-lg shadow-xl">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Varela Round, sans-serif' }}>Filter Applicants</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Refine the list of candidates based on your criteria.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(70vh - 120px)' }}>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Varela Round, sans-serif' }}>Experience Level</h4>
              <div className="space-y-1.5">
                {["Entry Level (0-2 years)", "Mid Level (3-5 years)", "Senior Level (5+ years)", "Lead/Principal (8+ years)"].map((level) => (
                  <label key={level} className="flex items-center space-x-2 text-sm text-gray-600">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Varela Round, sans-serif' }}>Key Skills</h4>
              <div className="space-y-1.5">
                {["React", "TypeScript", "Node.js", "Python", "AWS", "Project Management"].map((skill) => (
                  <label key={skill} className="flex items-center space-x-2 text-sm text-gray-600">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>
             <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Varela Round, sans-serif' }}>Application Status</h4>
              <div className="space-y-1.5">
                {["New", "In Review", "Interviewing", "Offer Extended", "Hired", "Rejected"].map((status) => (
                  <label key={status} className="flex items-center space-x-2 text-sm text-gray-600">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="p-6 pt-4 border-t flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="outline" onClick={() => setFilterModalOpen(false)} className="w-full sm:w-auto">Clear Filters</Button>
            <Button onClick={() => setFilterModalOpen(false)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Member Modal */}
      <Dialog open={isAddMemberModalOpen} onOpenChange={setAddMemberModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Varela Round, sans-serif' }}>Add New Member</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Enter the details for the new team member.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberName" className="text-right col-span-1 text-sm text-gray-700">
                Name
              </Label>
              <Input
                id="memberName"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="col-span-3 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Jane Doe"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberPosition" className="text-right col-span-1 text-sm text-gray-700">
                Position
              </Label>
              <Input
                id="memberPosition"
                value={newMemberPosition}
                onChange={(e) => setNewMemberPosition(e.target.value)}
                className="col-span-3 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberDepartment" className="text-right col-span-1 text-sm text-gray-700">
                Department
              </Label>
              <Input
                id="memberDepartment"
                value={newMemberDepartment}
                onChange={(e) => setNewMemberDepartment(e.target.value)}
                className="col-span-3 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Engineering"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddMemberModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleAddMember}
              className="bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] text-white font-semibold px-4 py-2 rounded-md h-auto text-sm"
            >
              Save Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
