"use client";

import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, Download, ExternalLink, ChevronRight } from 'lucide-react';
import * as XLSX from 'xlsx';
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Person = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  salary: string;
  startDate: string;
  lifeCycle: 'Hired' | 'Employed';
  status: 'Active' | 'Inactive';
};

const moreInitialPeopleData: Person[] = [
  { id: "1", name: "Alicia Shankur", email: "alicia.shankur@gmail.com", jobTitle: "Software Engineer", department: "Engineering", salary: "$2,500", startDate: "Mar 16, 2023", lifeCycle: "Hired", status: "Active" },
  { id: "2", name: "James Oyinkan", email: "jamesoyinkan@gmail.com", jobTitle: "Visual Designer", department: "Design", salary: "$2,000", startDate: "Jan 16, 2023", lifeCycle: "Hired", status: "Active" },
  { id: "3", name: "Diti Shreyas", email: "ditishreyas@gmail.com", jobTitle: "Visual Designer", department: "Design", salary: "$2,000", startDate: "Dec 09, 2024", lifeCycle: "Employed", status: "Inactive" },
  { id: "4", name: "Ishita Bhatgnar", email: "ishitadgir67@gmail.com", jobTitle: "UI/UX Designer", department: "Design", salary: "$1,500", startDate: "Jan 09, 2024", lifeCycle: "Employed", status: "Active" },
  { id: "5", name: "Kito Ashuth", email: "asthutor@gmail.com", jobTitle: "Content Writer", department: "Content", salary: "$1,000", startDate: "Jan 09, 2024", lifeCycle: "Hired", status: "Active" },
  { id: "6", name: "Dario Berik", email: "darioberik@yahoo.com", jobTitle: "Sales Manager", department: "Operation", salary: "$4,000", startDate: "Feb 21, 2022", lifeCycle: "Hired", status: "Active" },
  { id: "7", name: "Aresen Vlamadir", email: "aresen.v@example.com", jobTitle: "Mobile Assistant", department: "Product", salary: "$3,000", startDate: "Aug 07, 2022", lifeCycle: "Employed", status: "Inactive" },
  { id: "8", name: "Debby Philade", email: "debbythegreat@gmail.com", jobTitle: "Product Manager", department: "Product", salary: "$4,500", startDate: "Apr 02, 2022", lifeCycle: "Hired", status: "Active" },
  { id: "9", name: "Carlos Ray", email: "carlos.ray@example.com", jobTitle: "Frontend Developer", department: "Engineering", salary: "$2,800", startDate: "May 10, 2023", lifeCycle: "Hired", status: "Active" },
  { id: "10", name: "Linda Smith", email: "linda.smith@example.com", jobTitle: "HR Specialist", department: "Human Resources", salary: "$2,200", startDate: "Jul 20, 2023", lifeCycle: "Employed", status: "Active" },
  { id: "11", name: "Omar Ahmed", email: "omar.ahmed@example.com", jobTitle: "Backend Developer", department: "Engineering", salary: "$3,200", startDate: "Sep 01, 2022", lifeCycle: "Hired", status: "Inactive" },
  { id: "12", name: "Sophia Loren", email: "sophia.loren@example.com", jobTitle: "Marketing Lead", department: "Marketing", salary: "$3,800", startDate: "Nov 15, 2022", lifeCycle: "Employed", status: "Active" },
  { id: "13", name: "Kenji Tanaka", email: "kenji.tanaka@example.com", jobTitle: "Data Analyst", department: "Analytics", salary: "$2,900", startDate: "Oct 05, 2023", lifeCycle: "Hired", status: "Active" },
];

const ITEMS_PER_PAGE = 5;

export function PeoplePageClient() {
  const getUniqueValues = (people: Person[], key: keyof Person): string[] => {
    return Array.from(new Set(people.map(person => person[key]).filter(value => typeof value === 'string' && value.trim() !== '')));
  };

  const [peopleList, setPeopleList] = useState<Person[]>(moreInitialPeopleData);
  const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberJobTitle, setNewMemberJobTitle] = useState('');
  const [newMemberDepartment, setNewMemberDepartment] = useState('');
  const [newMemberSalary, setNewMemberSalary] = useState('');
  const [newMemberStartDate, setNewMemberStartDate] = useState('');
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPeople, setDisplayedPeople] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdvancedFilterModalOpen, setAdvancedFilterModalOpen] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterLifecycle, setFilterLifecycle] = useState<string>('');

  const handleExport = () => {
    // Use filteredPeopleForTotalPages to export data that matches current search/filter criteria
    // Or use peopleList to export all data irrespective of current filters
    // Or use displayedPeople to export only the current page's visible data

    const dataToExport = filteredPeopleForTotalPages.map(person => ({
      'Name': person.name,
      'Email': person.email,
      'Job Title': person.jobTitle,
      'Department': person.department,
      'Salary': person.salary,
      'Start Date': person.startDate, // Assuming it's already in a readable format
      'Status': person.status,
      'Life Cycle': person.lifeCycle,
      // Add other fields if necessary, ensuring they exist in the Person type
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PeopleData");

    // Define column widths (optional, but good for readability)
    // Example: {wch: 20} means 20 characters wide
    const colWidths = [
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 20 }, // Job Title
      { wch: 20 }, // Department
      { wch: 15 }, // Salary
      { wch: 15 }, // Start Date
      { wch: 10 }, // Status
      { wch: 15 }, // Life Cycle
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, "PeopleData.xlsx");
  };

  const filteredPeopleForTotalPages = peopleList.filter(person => {
    const searchMatch = searchTerm === '' ||
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.department.toLowerCase().includes(searchTerm.toLowerCase());

    return searchMatch;
  });
  const totalPages = Math.ceil(filteredPeopleForTotalPages.length / ITEMS_PER_PAGE);

  const handleSelectAll = (checked: boolean | string) => {
    const isChecked = Boolean(checked);
    setSelectAll(isChecked);
    const newSelectedRows: Record<string, boolean> = {};
    if (isChecked) {
      peopleList.forEach(person => newSelectedRows[person.id] = true);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (id: string, checked: boolean | string) => {
    const isChecked = Boolean(checked);
    setSelectedRows(prev => ({ ...prev, [id]: isChecked }));
    if (!isChecked) {
      setSelectAll(false);
    }
  };

  useEffect(() => {
    const allSelectedInFullList = peopleList.length > 0 && peopleList.every(person => selectedRows[person.id]);
    if (allSelectedInFullList !== selectAll) {
      setSelectAll(allSelectedInFullList);
    }
  }, [selectedRows, selectAll, peopleList]);

  useEffect(() => {
    const filtered = peopleList.filter(person => {
      const searchMatch = searchTerm === '' ||
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.department.toLowerCase().includes(searchTerm.toLowerCase());

      return searchMatch;
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedPeople(filtered.slice(startIndex, endIndex));
  }, [currentPage, peopleList, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAddMember = () => {
    if (!newMemberName.trim() || !newMemberEmail.trim() || !newMemberJobTitle.trim() || !newMemberDepartment.trim() || !newMemberSalary.trim() || !newMemberStartDate.trim()) {
      alert("Please fill in all member details.");
      return;
    }
    const newId = `person-${Date.now()}`;
    let formattedDate = newMemberStartDate.trim();
    if (newMemberStartDate.trim()) {
      try {
        const parsedDate = parseISO(newMemberStartDate.trim());
        formattedDate = format(parsedDate, 'MMM dd, yyyy');
      } catch (error) {
        console.error("Error parsing date:", error);
        alert("Invalid date format entered. Please ensure the date is correct.");
        return;
      }
    }

    const newPerson: Person = {
      id: newId,
      name: newMemberName.trim(),
      email: newMemberEmail.trim(),
      jobTitle: newMemberJobTitle.trim(),
      department: newMemberDepartment.trim(),
      salary: newMemberSalary.trim(),
      startDate: formattedDate,
      lifeCycle: 'Hired',
      status: 'Active',
    };
    setPeopleList(prevPeople => {
      const updatedList = [...prevPeople, newPerson];
      localStorage.setItem('employeeCount', updatedList.length.toString());
      return updatedList;
    });
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberJobTitle('');
    setNewMemberDepartment('');
    setNewMemberSalary('');
    setNewMemberStartDate('');
    setAddMemberModalOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-normal text-black">List of people</h1>
          <Button
            onClick={() => setAddMemberModalOpen(true)}
            className="bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] text-white font-semibold px-8 py-2 rounded-lg shadow-sm"
          >
            Add new member
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-auto flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, title, dept..."
              className="pl-10 w-full sm:w-[280px] md:w-[320px] bg-white border border-[#E3EFFF] rounded-lg shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[150px] md:w-[180px] bg-white border border-[#E3EFFF] rounded-lg shadow-sm">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[150px] md:w-[180px] bg-white border border-[#E3EFFF] rounded-lg shadow-sm">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="engineer">Engineer</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="bg-white border border-[#E3EFFF] text-black font-medium px-6 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:bg-muted w-full sm:w-auto"
            onClick={() => { /* Do nothing */ }}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Advanced Filter
          </Button>

          <div className="flex items-center gap-2 ml-auto pr-4 cursor-pointer group" onClick={handleExport}>
            <Download className="h-4 w-4 text-black group-hover:text-[#357ABD]" />
            <span className="text-black font-medium group-hover:text-[#357ABD]">Export</span>
          </div>
        </div>
      </div>

      <div className="bg-card p-0 rounded-lg shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="w-[50px] px-4 py-3">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </TableHead>
              <TableHead className="py-3 text-sm font-medium text-muted-foreground">Name</TableHead>
              <TableHead className="py-3 text-sm font-medium text-muted-foreground">Job Title</TableHead>
              <TableHead className="py-3 text-sm font-medium text-muted-foreground">Department</TableHead>
              <TableHead className="py-3 text-sm font-medium text-muted-foreground">Salary</TableHead>
              <TableHead className="py-3 text-sm font-medium text-muted-foreground">Start Date</TableHead>
              <TableHead className="py-3 text-sm font-medium text-muted-foreground">Life Cycle</TableHead>
              <TableHead className="py-3 text-sm font-medium text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedPeople.map((person) => (
              <TableRow key={person.id} className="border-b border-border last:border-b-0">
                <TableCell className="px-4 py-3">
                  <Checkbox
                    checked={selectedRows[person.id] || false}
                    onCheckedChange={(checked) => handleRowSelect(person.id, checked)}
                    aria-label={`Select row for ${person.name}`}
                  />
                </TableCell>
                <TableCell className="py-3">
                  <div className="font-bold text-foreground text-sm">{person.name}</div>
                  <div className="text-xs text-muted-foreground">{person.email}</div>
                </TableCell>
                <TableCell className="text-muted-foreground py-3 text-sm">{person.jobTitle}</TableCell>
                <TableCell className="text-muted-foreground py-3 text-sm">{person.department}</TableCell>
                <TableCell className="text-muted-foreground py-3 text-sm">{person.salary}</TableCell>
                <TableCell className="text-muted-foreground py-3 text-sm">{person.startDate}</TableCell>
                <TableCell className="text-muted-foreground py-3 text-sm">{person.lifeCycle}</TableCell>
                <TableCell className="py-3">
                  <Badge
                    className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-full",
                      person.status === 'Active'
                        ? "bg-[hsl(var(--success-badge-background))] text-[hsl(var(--success-badge-foreground))] hover:bg-[hsl(var(--success-badge-background))]"
                        : "bg-[hsl(var(--destructive-badge-background))] text-[hsl(var(--destructive-badge-foreground))] hover:bg-[hsl(var(--destructive-badge-background))]"
                    )}
                  >
                    {person.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end items-center gap-2 pt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            className={cn(
              "h-9 w-9",
              currentPage === page ? "bg-gradient-to-r from-[#357ABD] to-[#4A90E2] text-white" : "bg-card text-foreground border-border hover:bg-muted"
            )}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="default"
          size="icon"
          className="h-9 w-9 bg-gradient-to-r from-[#357ABD] to-[#4A90E2] text-white"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <Dialog open={isAddMemberModalOpen} onOpenChange={setAddMemberModalOpen}>
        <DialogContent className="sm:max-w-lg bg-white p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Varela Round, sans-serif' }}>Add New Member</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Enter the details for the new team member.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberName" className="text-right col-span-1 text-sm text-gray-700">Name</Label>
              <Input id="memberName" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} className="col-span-3 h-10" placeholder="e.g., Jane Doe" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberEmail" className="text-right col-span-1 text-sm text-gray-700">Email</Label>
              <Input id="memberEmail" type="email" value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)} className="col-span-3 h-10" placeholder="e.g., jane.doe@example.com" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberJobTitle" className="text-right col-span-1 text-sm text-gray-700">Job Title</Label>
              <Input id="memberJobTitle" value={newMemberJobTitle} onChange={(e) => setNewMemberJobTitle(e.target.value)} className="col-span-3 h-10" placeholder="e.g., Software Engineer" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberDepartment" className="text-right col-span-1 text-sm text-gray-700">Department</Label>
              <Input id="memberDepartment" value={newMemberDepartment} onChange={(e) => setNewMemberDepartment(e.target.value)} className="col-span-3 h-10" placeholder="e.g., Engineering" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberSalary" className="text-right col-span-1 text-sm text-gray-700">Salary</Label>
              <Input id="memberSalary" value={newMemberSalary} onChange={(e) => setNewMemberSalary(e.target.value)} className="col-span-3 h-10" placeholder="e.g., $5000 or 5000 USD" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberStartDate" className="text-right col-span-1 text-sm text-gray-700">Start Date</Label>
              <Input id="memberStartDate" type="date" value={newMemberStartDate} onChange={(e) => setNewMemberStartDate(e.target.value)} className="col-span-3 h-10" />
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

      <Dialog open={isSuccessModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent className="sm:max-w-md border-teal-500">
          <DialogHeader>
            <DialogTitle className="font-varela text-teal-400">Success!</DialogTitle>
            <DialogDescription>
              New member has been added successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setSuccessModalOpen(false)}
              className="bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] text-white font-semibold px-6 py-2 rounded-lg shadow-sm"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAdvancedFilterModalOpen} onOpenChange={setAdvancedFilterModalOpen}>
        <DialogContent className="sm:max-w-md border-teal-500">
          <DialogHeader>
            <DialogTitle className="font-varela text-teal-400">Advanced Filters</DialogTitle>
            <DialogDescription>
              Apply more specific filters to the people list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filterDepartment" className="text-right col-span-1">Department</Label>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
                  {getUniqueValues(peopleList, 'department')
                    .filter(dept => dept && dept.trim() !== '') // Ensure no empty strings reach SelectItem
                    .map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filterStatus" className="text-right col-span-1">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filterLifecycle" className="text-right col-span-1">Life Cycle</Label>
              <Select value={filterLifecycle} onValueChange={setFilterLifecycle}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="All Life Cycles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Life Cycles</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                  <SelectItem value="Employed">Employed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => {
              setFilterDepartment('');
              setFilterStatus('');
              setFilterLifecycle('');
              setCurrentPage(1); // Reset to page 1 when filters are cleared
              // The list will automatically re-filter due to state changes.
              // Optionally close the modal: setAdvancedFilterModalOpen(false);
            }}>Clear Filters</Button>
            <Button 
              onClick={() => {
                setCurrentPage(1); // Ensure view starts from the first page of filtered results
                setAdvancedFilterModalOpen(false);
              }} 
              className="bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] text-white font-semibold px-6 py-2 rounded-lg shadow-sm"
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
