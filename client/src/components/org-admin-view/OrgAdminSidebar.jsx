"use client";

import { useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Settings, LogOut } from "lucide-react";
import { AuthContext } from "@/context/auth-context";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function OrgAdminSidebar() {
  const { auth, resetCredentials } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const pathname = location.pathname;

  const navItems = [
    { title: "Dashboard", to: "/org-admin", icon: Home, color: "from-orange-500 to-orange-400" },
    { title: "Manage Users", to: "/org-admin/users", icon: Settings, color: "from-orange-500 to-orange-400" },
    { title: "Settings", to: "/org-admin/settings", icon: Settings, color: "from-orange-500 to-orange-400" },
  ];

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
    navigate("/auth");
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className={cn(
        "flex flex-col h-screen bg-white text-gray-700 transition-all duration-300 border-r border-gray-100",
        collapsed ? "w-20" : "w-64"
      )}>
        {/* Profile Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-sm w-full",
            collapsed ? "justify-center" : ""
          )}>
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-orange-500">
                {auth.user?.profileImage ? (
                  <AvatarImage src={auth.user.profileImage} alt="User Avatar" />
                ) : (
                  <AvatarFallback className="bg-gray-100 text-gray-700 text-xl font-bold">
                    {auth.user?.userName?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>

            {!collapsed && (
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-800 uppercase">{auth.user?.userName || "ORG ADMIN"}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{auth.user?.role || "Organization Admin"}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="ml-2 h-6 w-6 rounded-full border border-gray-300 bg-white text-gray-500 shadow-sm hover:bg-gray-100"
                  >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-[10px] text-orange-500 font-semibold truncate mt-1">ID: {auth.user?._id}</p>
              </div>
            )}
          </div>

          {collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="ml-2 h-6 w-6 rounded-full border border-gray-300 bg-white text-gray-500 shadow-sm hover:bg-gray-100"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-hidden py-4 px-2">
          {!collapsed && (
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
              Main Navigation
            </h3>
          )}
          <nav className="grid gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.to;
              const isHovered = hoveredItem === item.to;

              return (
                <Tooltip key={item.to}>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.to}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300",
                        isActive
                          ? "bg-orange-50 text-orange-600 font-semibold"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                        collapsed ? "justify-center" : ""
                      )}
                      onMouseEnter={() => setHoveredItem(item.to)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className={cn(
                        "relative flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300",
                        isActive || isHovered
                          ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                          : "bg-gray-100 text-gray-500"
                      )}>
                        <item.icon className="h-4 w-4" />
                      </div>

                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right" className="bg-gray-800 text-white border-none">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className={cn("p-4", collapsed ? "flex justify-center" : "")}>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "justify-start gap-2 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg",
              collapsed ? "w-10 h-10 p-0" : "w-full"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && (
              <span className="font-medium">Logout</span>
            )}
          </Button>
        </div>

      </div>
    </TooltipProvider>
  );
}

export default OrgAdminSidebar;
