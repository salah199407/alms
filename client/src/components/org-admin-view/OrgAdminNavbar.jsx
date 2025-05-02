// src/components/org-admin-view/OrgAdminNavbar.jsx

"use client";

import { Bell, Search, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import logo from "/logo.png"; // Ton logo

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function OrgAdminNavbar() {
  const { auth, resetCredentials } = useAuth();
  const user = auth.user;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleLogout() {
    resetCredentials();
    window.location.href = "/auth"; // Rediriger vers login
  }

  return (
    <header
      className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-gradient-to-r from-gray-900 to-black px-4 text-white shadow-lg border-b"
      style={{ fontFamily: 'Helvetica' }}
    >
      {/* Logo + Titre */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="font-extrabold text-lg md:text-xl">
            ODC LEARNING
          </span>
        </Link>
      </div>

      {/* Search + Icons + Avatar */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        {isSearchOpen ? (
          <div className="relative animate-fadeIn">
            <Input
              placeholder="Rechercher..."
              className="w-[250px] bg-gray-800 border-gray-700 text-white rounded-full pl-10"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-800 rounded-full"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Rechercher</span>
          </Button>
        )}

        {/* Message Icon */}
        <Button variant="ghost" size="icon" className="relative text-white hover:bg-gray-800 rounded-full">
          <MessageSquare className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-orange-500 p-0 flex items-center justify-center text-[10px]">
            2
          </Badge>
          <span className="sr-only">Messages</span>
        </Button>

        {/* Notification Icon */}
        <Button variant="ghost" size="icon" className="relative text-white hover:bg-gray-800 rounded-full">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-orange-500 p-0 flex items-center justify-center text-[10px]">
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Organization Admin Title */}
        <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mr-2">
          Organization Admin
        </span>

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
              <div className="h-8 w-8 rounded-full border-2 border-orange-500 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.userName?.charAt(0).toUpperCase() || "A"}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 bg-gray-900 text-white" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.userName}</p>
                <p className="text-xs leading-none text-orange-500 font-bold">Org Admin</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link to="/profile-settings" className="w-full">
                Profil
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={handleLogout}>
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
