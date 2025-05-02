"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  async function handleRegisterUser(event) {
    event.preventDefault();
    setRegistrationError("");

    if (!signUpFormData?.userName?.trim() || !signUpFormData?.userEmail?.trim() || !signUpFormData?.password?.trim()) {
      setRegistrationError("Please fill in all fields: Full Name, Email, and Password.");
      return;
    }

    try {
      const response = await registerService(signUpFormData);

      if (response.success) {
        setShowSuccessModal(true);
        setSignUpFormData(initialSignUpFormData);
      } else {
        setRegistrationError(response.error || response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationError("Registration failed. Please try again later.");
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    try {
      const data = await loginService(signInFormData);

      if (data.success) {
        const userData = {
          authenticate: true,
          user: data.data.user,
        };

        sessionStorage.setItem("auth", JSON.stringify(userData));
        sessionStorage.setItem("authToken", data.data.accessToken);

        setAuth(userData);
      } else {
        resetCredentials();
      }
    } catch (error) {
      console.error("Login error:", error);
      resetCredentials();
    }
  }

  async function checkAuthUser() {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        resetCredentials();
        return;
      }

      const userData = await checkAuthService(token);
      const storedAuth = JSON.parse(sessionStorage.getItem("auth"));

      if (storedAuth && storedAuth.authenticate) {
        setAuth(storedAuth);
        setLoading(false);
        return;
      }

      if (userData.success) {
        setAuth({
          authenticate: true,
          user: userData.data.user,
        });

        sessionStorage.setItem(
          "auth",
          JSON.stringify({
            authenticate: true,
            user: userData.data.user,
          }),
        );
      } else {
        resetCredentials();
      }
    } catch (error) {
      console.log(error);
      resetCredentials();
    } finally {
      setLoading(false);
    }
  }

  function resetCredentials() {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("authToken");
    setAuth({
      authenticate: false,
      user: null,
    });
  }

  function closeSuccessModal() {
    setShowSuccessModal(false);
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
        showSuccessModal,
        closeSuccessModal,
        registrationError,
        setRegistrationError,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
