import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@utils/axiosInstance";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";
interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  userStatus: boolean;
  setUser: any;
  LoginWithGoogle: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [userStatus, setUserStatus] = useState<boolean>(false);
  const { getData } = useContext(CartContext);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserStatus(true);
    }
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        {
          email,
          password,
        },
      );

      setUserStatus(true);
      setUser(response.data.user);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      await getData();
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      toast.error("Sai email hoặc mật khẩu!");
    }
  };
  const LoginWithGoogle = (user, token) => {
    setUserStatus(true);
    setUser(user);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Đăng nhập thành công!");
  }
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post(
        "/auth/register",
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
