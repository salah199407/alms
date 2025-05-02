"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  GraduationCap,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const imageVariants = {
  hover: { scale: 1.05 },
  initial: { scale: 1 },
};

export function OrganizationCard({ org, onDelete, onEdit }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <motion.div
      layout
      whileHover="hover"
      initial="initial"
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      variants={{
        hidden: { y: 20, opacity: 0 },
        show: {
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 260, damping: 20 },
        },
      }}
      className="group overflow-hidden rounded-xl bg-white shadow-lg shadow-orange-500/5 transition-all hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer"
      onClick={() => navigate(`/super-admin/organizations/${org._id}`)} // ✅ navigation simple
    >
      {/* Banner image */}
      <div className="relative h-32 w-full overflow-hidden sm:h-40">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 to-transparent" />
        <motion.img
          src={org.image || "/placeholder.svg"}
          alt={`${org.name} banner`}
          className="h-full w-full object-cover"
          variants={imageVariants}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="p-5 sm:p-6">
        {/* Info */}
        <div className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-4">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 blur-sm opacity-70 group-hover:opacity-100 transition-all"></div>
            <Avatar className="relative z-10 h-16 w-16 bg-orange-100 border-2 border-white shadow-md flex items-center justify-center">
              <AvatarFallback className="text-orange-800 text-lg font-bold">
                {org.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h3 className="text-lg font-semibold sm:text-xl">{org.name}</h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2 sm:text-base">
              {org.description}
            </p>
            <p className="mt-2 text-xs text-gray-500 sm:mt-2">
              Created: {formatDate(org.createdAt)}
            </p>
          </div>
        </div>

        {/* Stats + Actions */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 sm:mt-5 sm:flex-nowrap">
          {/* Stats */}
          <div className="flex gap-3 sm:gap-5">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">
                  {org.admins?.length || 0}
                </span>
              </div>
              <span className="text-xs text-gray-500">Admins</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <UserCog className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">
                  {org.instructors?.length || 0}
                </span>
              </div>
              <span className="text-xs text-gray-500">Instructors</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">
                  {org.students?.length || 0}
                </span>
              </div>
              <span className="text-xs text-gray-500">Students</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-orange-600 border-orange-200 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700"
                onClick={(e) => {
                  e.stopPropagation(); // ⛔ bloque la propagation vers le card click
                  onEdit(org);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-red-600 border-red-200 hover:border-red-500 hover:bg-red-50 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation(); // ⛔ empêche le clic d’ouvrir les détails
                  onDelete(org._id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
