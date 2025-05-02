import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrganizationDetails } from "@/services";

function OrganizationDetails() {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrgDetails() {
      const res = await getOrganizationDetails(id);
      if (res.success) {
        setOrganization(res.data);
      } else {
        alert("❌ Error fetching organization details");
      }
      setLoading(false);
    }

    fetchOrgDetails();
  }, [id]);

  if (loading) return <div className="p-8">Loading organization...</div>;
  if (!organization) return <div className="p-8 text-red-500">Organization not found.</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">{organization.name}</h1>
      <p className="mb-4 text-gray-700">{organization.description}</p>

      {organization.image && (
        <img
          src={organization.image}
          alt="Org"
          className="w-64 h-40 object-cover rounded mb-6"
        />
      )}

      <h2 className="text-xl font-semibold mb-2">Admins</h2>
      <ul className="list-disc pl-6">
        {organization.admins.map((admin) => (
          <li key={admin._id}>
            {admin.userName} ({admin.userEmail})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrganizationDetails;
