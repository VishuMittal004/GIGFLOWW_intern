"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SalaryEntry = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  netSalary: string;
  status: 'Paid' | 'Pending';
};

type SelectedEmployeeDetails = {
  avatarUrl: string;
  dataAiHintAvatar?: string;
  name: string;
  title: string;
  position: string;
  department: string;
  status: 'Active' | 'Inactive';
  basicSalary: string;
  bonusAndOvertime: string;
  deduction: string;
  nextSalary: string;
  bankDetails: string; 
  currency: string;
  monthlySalaryDisplay: string;
  cardBackgroundImageUrl: string;
  dataAiHintCardBg?: string;
};

const salaryData: SalaryEntry[] = [
  { id: "emp001", name: "Dr. Evelyn Reed", email: "evelyn.reed@example.com", jobTitle: "Lead Data Scientist", department: "Research & Development", netSalary: "$7,800", status: "Paid" },
  { id: "emp002", name: "Marcus Cole", email: "marcus.cole@example.com", jobTitle: "Senior UX Designer", department: "Design Innovation", netSalary: "$6,500", status: "Paid" },
  { id: "emp003", name: "Isabelle Moreau", email: "isabelle.moreau@example.com", jobTitle: "Cloud Solutions Architect", department: "IT Infrastructure", netSalary: "$8,200", status: "Pending" },
  { id: "emp004", name: "Kenji Tanaka", email: "kenji.tanaka@example.com", jobTitle: "DevOps Engineer", department: "Platform Engineering", netSalary: "$7,100", status: "Paid" },
  { id: "emp005", name: "Aisha Khan", email: "aisha.khan@example.com", jobTitle: "Digital Marketing Lead", department: "Marketing & Growth", netSalary: "$6,900", status: "Paid" },
  { id: "emp006", name: "Leo Maxwell", email: "leo.maxwell@example.com", jobTitle: "Cybersecurity Analyst", department: "Information Security", netSalary: "$7,500", status: "Pending" },
  { id: "emp007", name: "Sofia Petrova", email: "sofia.petrova@example.com", jobTitle: "AI Ethics Researcher", department: "Advanced Technologies", netSalary: "$6,800", status: "Paid" },
  { id: "emp008", name: "Carlos Ramirez", email: "carlos.ramirez@example.com", jobTitle: "Mobile Application Developer", department: "Software Development", netSalary: "$7,300", status: "Paid" },
  { id: "emp009", name: "Freya Nielsen", email: "freya.nielsen@example.com", jobTitle: "Customer Success Manager", department: "Client Relations", netSalary: "$6,200", status: "Pending" },
  { id: "emp010", name: "Rohan Sharma", email: "rohan.sharma@example.com", jobTitle: "Business Intelligence Analyst", department: "Data Analytics", netSalary: "$7,000", status: "Paid" }
];

const initialSelectedEmployeeDetails: SelectedEmployeeDetails = {
  avatarUrl: "https://i.pravatar.cc/80?u=elizabeth-james", 
  dataAiHintAvatar: "woman professional",
  name: "Elizabeth James",
  title: "UI Designer",
  position: "UI lead",
  department: "Design",
  status: "Active",
  basicSalary: "$3500",
  bonusAndOvertime: "$500",
  deduction: "$0.00",
  nextSalary: "$3500",
  bankDetails: "234567890\nPolaris Bank",
  currency: "$USD",
  monthlySalaryDisplay: "$3500",
  cardBackgroundImageUrl: "https://picsum.photos/seed/newbgtest/380/144",
  dataAiHintCardBg: "abstract background",
};


export function SalaryPageClient() {
  const [selectedEmployee, setSelectedEmployee] = useState<SelectedEmployeeDetails>(initialSelectedEmployeeDetails);
  const [salaryEntries, setSalaryEntries] = useState<SalaryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Pending">("All");

  const uniqueDepartments = ["All", ...new Set(salaryData.map(entry => entry.department))];

  const handleDepartmentChange = (value: string) => {
    setFilterDepartment(value);
  };

  const handleStatusChange = (value: "All" | "Paid" | "Pending") => {
    setFilterStatus(value);
  };

  const renderDetailRow = (label: string, value: React.ReactNode) => (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className="font-medium text-foreground text-right whitespace-pre-line">{value}</span>
    </div>
  );

  const handleRowClick = (employeeId: string) => {
    const clickedEntry = salaryData.find(entry => entry.id === employeeId);
    if (clickedEntry) {
      setSelectedEmployee({
        ...initialSelectedEmployeeDetails, // Preserve defaults for fields not in SalaryEntry
        name: clickedEntry.name,
        title: clickedEntry.jobTitle,
        department: clickedEntry.department,
        nextSalary: clickedEntry.netSalary,
        monthlySalaryDisplay: clickedEntry.netSalary,
        // Use a dynamic avatar for better visual feedback
        avatarUrl: `https://i.pravatar.cc/80?u=${clickedEntry.id}`,
        dataAiHintAvatar: `profile picture of ${clickedEntry.name.split(' ')[0]}`,
        // Other fields from SelectedEmployeeDetails not present in SalaryEntry 
        // will retain their default values from initialSelectedEmployeeDetails.
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = React.useMemo(() => {
    return salaryData
    .filter((entry) => {
      const term = searchTerm.toLowerCase();
      const nameMatch = entry.name.toLowerCase().includes(term);
      const emailMatch = entry.email.toLowerCase().includes(term);
      const titleMatch = entry.jobTitle.toLowerCase().includes(term);
      const departmentMatch = entry.department.toLowerCase().includes(term);
      const searchMatch = nameMatch || emailMatch || titleMatch || departmentMatch;

      const departmentFilterMatch = filterDepartment === "All" || entry.department === filterDepartment;
      const statusFilterMatch = filterStatus === "All" || entry.status === filterStatus;

      return searchMatch && departmentFilterMatch && statusFilterMatch;
    });
  }, [searchTerm, filterDepartment, filterStatus]); // salaryData is stable, not strictly needed as dep

  // Update salaryEntries based on filteredData and slice
  React.useEffect(() => {
    setSalaryEntries(filteredData.slice(0, 9));
  }, [filteredData]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Panel: Salary Activities Table */}
      <div className="flex-1 lg:w-2/3 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Salary Activities</h1>
        <div className="flex items-center gap-3">
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, email, title, department..." className="pl-10 w-full bg-card" value={searchTerm} onChange={handleSearchChange} />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-card hover:bg-muted text-foreground w-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-card border-border shadow-lg rounded-md p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department-filter" className="text-sm font-medium text-muted-foreground">Department</Label>
                <Select value={filterDepartment} onValueChange={handleDepartmentChange}>
                  <SelectTrigger id="department-filter" className="w-full bg-input border-border text-foreground">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    {uniqueDepartments.map(dept => (
                      <SelectItem key={dept} value={dept} className="hover:bg-muted/50 focus:bg-muted/50">
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status-filter" className="text-sm font-medium text-muted-foreground">Status</Label>
                <Select value={filterStatus} onValueChange={handleStatusChange as (value: string) => void}>
                  <SelectTrigger id="status-filter" className="w-full bg-input border-border text-foreground">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    <SelectItem value="All" className="hover:bg-muted/50 focus:bg-muted/50">All</SelectItem>
                    <SelectItem value="Paid" className="hover:bg-muted/50 focus:bg-muted/50">Paid</SelectItem>
                    <SelectItem value="Pending" className="hover:bg-muted/50 focus:bg-muted/50">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="bg-card p-0 rounded-lg shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead className="py-3 text-sm font-medium text-muted-foreground w-[250px] pl-6">Name</TableHead>
                <TableHead className="py-3 text-sm font-medium text-muted-foreground w-[200px] px-6">Job Title</TableHead>
                <TableHead className="py-3 text-sm font-medium text-muted-foreground w-[200px] px-6">Department</TableHead>
                <TableHead className="py-3 text-sm font-medium text-muted-foreground w-[120px] px-6">Net Salary</TableHead>
                <TableHead className="py-3 text-sm font-medium text-muted-foreground w-[120px] pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaryEntries.map((entry) => (
                <TableRow 
                  key={entry.id} 
                  className="hover:bg-muted/50 border-b border-border last:border-b-0 cursor-pointer"
                  onClick={() => handleRowClick(entry.id)}
                >
                  <TableCell className="py-4 w-[250px] pl-6">
                    <div className="font-medium text-foreground text-sm">{entry.name}</div>
                    <div className="text-xs text-muted-foreground">{entry.email}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground py-4 text-sm w-[200px] px-6">{entry.jobTitle}</TableCell>
                  <TableCell className="text-muted-foreground py-4 text-sm w-[200px] px-6">{entry.department}</TableCell>
                  <TableCell className="text-muted-foreground py-4 text-sm w-[120px] px-6">{entry.netSalary}</TableCell>
                  <TableCell className="py-4 w-[120px] pr-6">
                    <Badge
                      className={cn(
                        "px-2.5 py-1 text-xs font-semibold rounded-md border-none",
                        entry.status === 'Paid'
                          ? "bg-[hsl(var(--success-badge-background))] hover:bg-[hsl(var(--success-badge-background))] text-[hsl(var(--success-badge-foreground))]"
                          : "bg-[hsl(var(--pending-badge-background))] hover:bg-[hsl(var(--pending-badge-background))] text-[hsl(var(--pending-badge-foreground))]"
                      )}
                    >
                      {entry.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Right Panel: Selected Employee Details */}
      <div className="lg:w-[380px] flex-shrink-0 space-y-6">
        <div className="flex flex-col space-y-2 mt-2">
          <div className="self-end">
            <Select defaultValue="may-2025">
              <SelectTrigger className="w-[150px] bg-card">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="may-2025">May 2025</SelectItem>
                <SelectItem value="april-2025">April 2025</SelectItem>
                <SelectItem value="june-2025">June 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full h-10 px-4 py-2 text-sm font-medium text-foreground bg-card hover:bg-muted justify-between">
            <span>Monthly Salary -</span>
            <span>{selectedEmployee.monthlySalaryDisplay}</span>
          </Button>
        </div>

        <Card className="overflow-hidden shadow-md rounded-lg border flex flex-col">
          <div className="relative h-36 bg-primary">
            <Image 
              src={selectedEmployee.cardBackgroundImageUrl} 
              alt="Profile background" 
              fill={true}
              style={{objectFit: "cover"}}
              data-ai-hint={selectedEmployee.dataAiHintCardBg || "abstract background"}
            />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10">
              <Avatar className="h-20 w-20 border-4 border-card bg-card">
                <AvatarImage src={selectedEmployee.avatarUrl} alt={selectedEmployee.name} data-ai-hint={selectedEmployee.dataAiHintAvatar || "person professional"}/>
                <AvatarFallback>{selectedEmployee.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <CardContent className="pt-12 text-center">
            <h3 className="text-xl font-semibold text-foreground">{selectedEmployee.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedEmployee.title}</p>
          </CardContent>
          <Separator className="my-0" />
          <CardContent className="pt-4 pb-4 space-y-3.5 text-sm flex-1">
            {renderDetailRow("Position", selectedEmployee.position)}
            {renderDetailRow("Department", selectedEmployee.department)}
            {renderDetailRow("Status", 
              <Badge 
                className={cn(
                  "px-2.5 py-0.5 text-xs font-semibold rounded-full border-none",
                  selectedEmployee.status === 'Active' 
                  ? "bg-[hsl(var(--success-badge-background))] text-[hsl(var(--success-badge-foreground))]" 
                  : "bg-[hsl(var(--destructive-badge-background))] text-[hsl(var(--destructive-badge-foreground))]"
                )}
              >
                {selectedEmployee.status}
              </Badge>
            )}
            {renderDetailRow("Basic Salary", selectedEmployee.basicSalary)}
            {renderDetailRow("Bonus & Overtime", selectedEmployee.bonusAndOvertime)}
            {renderDetailRow("Deduction", selectedEmployee.deduction)}
            {renderDetailRow("Next Salary", selectedEmployee.nextSalary)}
            {renderDetailRow("Bank Details", selectedEmployee.bankDetails)}
            {renderDetailRow("Currency", selectedEmployee.currency)}
          </CardContent>
          <Separator className="my-0" />
          <CardFooter className="pt-3 px-3 pb-[2px]">
            <Button variant="link" asChild className="w-full justify-center text-primary hover:text-primary/80 py-1">
              <a href="#">
                View Payroll History <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}