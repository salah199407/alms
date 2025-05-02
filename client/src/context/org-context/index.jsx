import { createContext, useContext, useState } from "react";
import {
  getAllOrganizations,
  createOrganizationWithImage,
 
  deleteOrganizationById,
  getOrganizationDetails,
  createUserForOrganization,
} from "@/services"; // Assure-toi que ce fichier contient les bons services

const OrgContext = createContext();

export function OrgProvider({ children }) {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  async function fetchOrganizations() {
    const res = await getAllOrganizations();
    if (res.success) setOrganizations(res.data);
  }

  async function fetchOrganizationDetails(id) {
    const res = await getOrganizationDetails(id);
    if (res.success) setSelectedOrganization(res.data);
  }

  return (
    <OrgContext.Provider
      value={{
        organizations,
        selectedOrganization,
        fetchOrganizations,
        fetchOrganizationDetails,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  return useContext(OrgContext);
}
