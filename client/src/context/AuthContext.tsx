import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginStatus: boolean;
  dataSearch: string;
  resultSearch: (data: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [dataSearch, setDatasearch] = useState<string>("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoginStatus(true);
    }
  }, []);
  const login = async (email: string, password: string) => {
    try {
      console.log("Login", email, password);
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      console.log("CHECK TYPOER", response.data);
      setLoginStatus(true);
      setUser(response.data.user);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      throw new Error("Sai email hoặc mật khẩu!");
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        username,
        email,
        password,
      });

      console.log("Đăng ký thành công:", response.data);
    } catch (error) {
      throw new Error("Đăng ký thất bạsi!");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setLoginStatus(false);
    alert("Đăng xuất thành công ");
  };
  const resultSearch = (data: string) => {
    setDatasearch(data);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loginStatus,
        dataSearch,
        resultSearch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
