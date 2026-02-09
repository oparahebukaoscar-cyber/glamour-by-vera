import { useAuthStore } from "../store/authStore";

export default function useAuth() {
  const { user, login, logout } = useAuthStore();

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}