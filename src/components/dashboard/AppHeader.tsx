"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";




// Define types and mock data for Profile Modal
interface DetailedUserProfile {
  avatarUrl: string;
  name: string;
  title: string;
  position: string;
  department: string;
  email: string;
  skills: string[];
  bio: string;
  joinDate: string;
  team: string;
  status: 'Active' | 'On Leave';
}

const mockUserProfiles: DetailedUserProfile[] = [
  {
    avatarUrl: "https://i.pravatar.cc/100?u=john-doe", name: "John Doe", title: "Software Engineer", position: "Senior Developer", department: "Engineering", email: "john.doe@example.com",
    skills: ["React", "Node.js", "TypeScript", "GraphQL", "AWS"],
    bio: "Passionate software engineer with 8+ years of experience in building scalable web applications. Enjoys tackling complex problems and mentoring junior developers.",
    joinDate: "2018-05-15",
    team: "Alpha Squad",
    status: "Active",
  },
  {
    avatarUrl: "https://placehold.co/100x100/D1FAE5/065F46?text=AS", name: "Alice Smith", title: "Product Manager", position: "Lead PM", department: "Product", email: "alice.smith@example.com",
    skills: ["Agile", "Roadmapping", "User Research"],
    bio: "Experienced Product Manager focused on delivering user-centric products.",
    joinDate: "2019-02-20",
    team: "Bravo Team",
    status: "Active",
  },
  {
    avatarUrl: "https://placehold.co/100x100/FEF3C7/92400E?text=BW", name: "Bob Williams", title: "UX Designer", position: "Principal Designer", department: "Design", email: "bob.williams@example.com",
    skills: ["UI Design", "UX Strategy", "Prototyping", "Figma"],
    bio: "Creative UX Designer passionate about crafting intuitive and beautiful user experiences.",
    joinDate: "2020-09-01",
    team: "Charlie Crew",
    status: "Active",
  },
];

const mockNotifications = [
  "🎉 New feature released: Dark Mode is now available!",
  "💸 Your monthly salary has been processed successfully.",
  "🗓️ Reminder: Team meeting tomorrow at 10 AM.",
  "💬 You have 3 unread messages from Alice.",
  "🔧 System maintenance scheduled for tonight at 2 AM.",
  "🚀 Project Alpha has reached a new milestone!",
];

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/people", label: "People" },
  { href: "/hiring", label: "Hiring" },
  { href: "/salary", label: "Salary" },
  { href: "/reviews", label: "Reviews" },
];

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  // const [selectedIcon, setSelectedIcon] = useState<string | null>(null); // Removed selectedIcon state

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const handleLogout = () => {
    router.push('/register');
  };
  const [currentProfile, setCurrentProfile] = useState<DetailedUserProfile | null>(mockUserProfiles[0] || null);

  const handleAvatarClick = () => {
    // If currentProfile is not set (e.g., mockUserProfiles was empty), set it to the first one.
    // This is a fallback, as it's initialized in useState now.
    if (!currentProfile && mockUserProfiles.length > 0) {
      setCurrentProfile(mockUserProfiles[0]);
    }
    setIsProfileModalOpen(true);
  };

  const renderProfileDetail = (label: string, value: string) => (
    <div className="grid grid-cols-3 items-center text-sm">
      <span className="col-span-1 text-muted-foreground">{label}:</span>
      <span className="col-span-2 font-medium text-foreground break-words">{value}</span>
    </div>
  );

  const renderSkillsList = (skills: string[]) => (
    <div className="text-sm">
      <span className="text-muted-foreground">Skills:</span>
      <div className="flex flex-wrap gap-2 mt-1">
        {skills.map(skill => (
          <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  const renderBio = (bio: string) => (
    <div className="text-sm">
      <span className="text-muted-foreground">Bio:</span>
      <p className="mt-1 font-medium text-foreground whitespace-pre-wrap">{bio}</p>
    </div>
  );

  const renderProfileDetailWide = (label: string, value: string) => (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );

  return (
    <header
      className="mx-4 w-auto max-w-[1800px] h-[64px] flex items-center justify-between px-6 lg:px-8 bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] rounded-full overflow-hidden shadow-md border border-[#357ABD] mt-8"
      style={{ fontFamily: 'Varela Round, Inter, Arial, sans-serif', boxShadow: '0 2px 8px 0 rgba(80,120,200,0.07)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-[210px]">
        <span className="ml-2 flex items-center">
          <Image src="/gig.png" alt="GigFloww Logo" width={28} height={28} />
          <span className="ml-2 text-white text-xl font-bold tracking-wide" style={{ letterSpacing: '0.04em', fontFamily: 'Varela Round, Inter, Arial, sans-serif' }}>GIGFLOWW</span>
        </span>
      </div>
      {/* Nav Links */}
      <nav className="flex items-center gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-5 py-1.5 text-base font-medium transition-all duration-150",
              pathname === item.href
                ? "bg-white text-[#4A90E2] shadow-none rounded-full border border-[#E3EFFF]"
                : "text-white hover:bg-white/10 hover:text-white rounded-full",
              "focus:outline-none focus:ring-2 focus:ring-white/60"
            )}
            style={{ fontFamily: 'Varela Round, Inter, Arial, sans-serif', minWidth: '110px', textAlign: 'center' }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {/* Icons & Avatar */}
      <div className="flex items-center gap-4 min-w-[120px] justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="group flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-gradient-to-r hover:from-[#4A90E2] hover:to-[#357ABD] focus:outline-none data-[state=open]:bg-white data-[state=open]:border-[#E3EFFF] border border-transparent"
            >
              <Settings className="w-5 h-5 text-white group-data-[state=open]:text-[#4A90E2]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-4" align="end">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleAvatarClick}>Account</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={() => setIsNotificationModalOpen(true)}
          className="group relative flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-white/20 focus:outline-none border border-transparent"
        >
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white" style={{ fontSize: '10px', height: '16px', width: '16px', lineHeight: '16px' }}>{mockNotifications.length}</span>
        </button>

        <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
          <DialogTrigger asChild>
            <button 
              onClick={handleAvatarClick} 
              className="ml-2 w-9 h-9 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white/80"
            >
              <img src={currentProfile?.avatarUrl || "https://i.pravatar.cc/40?u=appHeaderUser"} alt="User Avatar" className="w-full h-full object-cover rounded-full" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Employee Profile</DialogTitle>
              <DialogDescription>
                Details for the selected employee.
              </DialogDescription>
            </DialogHeader>
            {currentProfile && (
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={currentProfile.avatarUrl} alt={currentProfile.name} />
                    <AvatarFallback>{currentProfile.name.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{currentProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentProfile.title}</p>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  {renderProfileDetail("Position", currentProfile.position)}
                  {renderProfileDetail("Department", currentProfile.department)}
                  {renderProfileDetail("Email", currentProfile.email)}
                  {renderProfileDetail("Team", currentProfile.team)}
                  {renderProfileDetail("Join Date", currentProfile.joinDate)}
                  {renderProfileDetail("Status", currentProfile.status)}
                  <div className="mt-2 col-span-2">{renderSkillsList(currentProfile.skills)}</div>
                  <div className="mt-2 col-span-2">{renderBio(currentProfile.bio)}</div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsProfileModalOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Notification Modal */}
        <Dialog open={isNotificationModalOpen} onOpenChange={setIsNotificationModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
              <DialogDescription>
                Here are your latest updates.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3 max-h-[400px] overflow-y-auto">
              {mockNotifications.length > 0 ? (
                mockNotifications.map((notification, index) => (
                  <div key={index} className="p-3 bg-slate-50 rounded-md shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-700">{notification}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center">No new notifications.</p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNotificationModalOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </header>
  );
}
