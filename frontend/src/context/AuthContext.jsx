import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("novared_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // Called after a real backend login response — expects { token, first_name, last_name, role }
  const login = (userData) => {
    const fullName = `${userData.first_name || ""} ${userData.last_name || ""}`.trim();
    const sessionUser = {
      fullName,
      role: userData.role,
      token: userData.token, // JWT from backend, used for authenticated requests like /api/auth/profile
    };
    setUser(sessionUser);
    localStorage.setItem("novared_user", JSON.stringify(sessionUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("novared_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}