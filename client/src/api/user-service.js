import axiosInstance from "@/api/axiosInstance"

/**
 * Récupère les détails de l'utilisateur actuel
 * @returns {Promise<Object>} - Les détails de l'utilisateur
 */
export async function getCurrentUser() {
  try {
    const { data } = await axiosInstance.get("/api/users/current")
    return {
      success: true,
      data: data.user,
    }
  } catch (error) {
    console.error("Error fetching current user:", error)
    return {
      success: false,
      message: "Erreur lors de la récupération des informations utilisateur",
    }
  }
}

/**
 * Met à jour le profil de l'utilisateur
 * @param {Object} profileData - Les données du profil à mettre à jour
 * @returns {Promise<Object>} - Le résultat de la mise à jour
 */
export async function updateUserProfile(profileData) {
  try {
    const { data } = await axiosInstance.put("/api/users/profile", profileData)
    return {
      success: true,
      data: data.user,
    }
  } catch (error) {
    console.error("Error updating user profile:", error)
    return {
      success: false,
      message: "Erreur lors de la mise à jour du profil",
    }
  }
}

/**
 * Met à jour les paramètres de l'utilisateur
 * @param {Object} settingsData - Les paramètres à mettre à jour
 * @returns {Promise<Object>} - Le résultat de la mise à jour
 */
export async function updateUserSettings(settingsData) {
  try {
    const { data } = await axiosInstance.put("/api/users/settings", settingsData)
    return {
      success: true,
      data: data.settings,
    }
  } catch (error) {
    console.error("Error updating user settings:", error)
    return {
      success: false,
      message: "Erreur lors de la mise à jour des paramètres",
    }
  }
}

/**
 * Récupère les certifications de l'utilisateur
 * @returns {Promise<Object>} - Les certifications de l'utilisateur
 */
export async function getUserCertifications() {
  try {
    const { data } = await axiosInstance.get("/api/users/certifications")
    return {
      success: true,
      data: data.certifications,
    }
  } catch (error) {
    console.error("Error fetching user certifications:", error)
    return {
      success: false,
      message: "Erreur lors de la récupération des certifications",
      data: [],
    }
  }
}
