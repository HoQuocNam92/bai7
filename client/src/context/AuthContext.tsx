import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  userStatus: boolean;
  setUser: any;
  LoginWithGoogle:any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [userStatus, setUserStatus] = useState<boolean>(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserStatus(true);
    }
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        },
      );
      setUserStatus(true);
      setUser(response.data.user);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      toast.error("Sai email hoặc mật khẩu!");
    }
  };
  const LoginWithGoogle = (user , token)=>{
    console.log("Check token " , token);
    console.log("Check user " , user);
    setUserStatus(true);
    setUser(user);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Đăng nhập thành công!");
  }
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name,
          email,
          password,
        },
      );
      console.log("Đăng ký thành công:", response.data);
      toast.success("Đăng ký thành công!");
    } catch (error) {
      toast.error("Đăng ký thất bại!");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setUserStatus(false);
    toast.success("Đăng xuất thành công!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        userStatus,
        setUser,
        LoginWithGoogle
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
