import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { Stack } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
const Login = () => {
  const { login } = useAuth(); // Gọi hàm đăng nhập từ AuthContext
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Sai email hoặc mật khẩu!");
    }
  };
  return (
    <Box bgcolor="#543895" paddingTop="32px" height="100vh" width="100%">
      <Box
        sx={{
          width: "600px",
          margin: " auto",
          display: "flex",
          alignItems: "center",
          height: "50vh",
          borderRadius: "14px",
        }}
        bgcolor="#fff"
      >
        <Stack spacing={2} width="100%">
          {" "}
          {/* spacing tạo khoảng cách giữa các hàng */}
          <Typography textAlign="center" variant="h5" component="h1">
            LOGIN
          </Typography>
          <Box sx={{ position: "relative", paddingInline: "10px" }}>
            <PersonIcon
              sx={{ position: "absolute", top: "14px", left: "18px" }}
            />
            <TextField
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              fullWidth
              InputLabelProps={{ sx: { paddingLeft: "22px" } }}
              InputProps={{ sx: { paddingLeft: "22px" } }}
            />
          </Box>
          <Box sx={{ position: "relative", paddingInline: "10px" }}>
            <LockIcon
              sx={{ position: "absolute", top: "12px", left: "18px" }}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              variant="standard"
              fullWidth
              InputLabelProps={{ sx: { paddingLeft: "22px" } }}
              InputProps={{ sx: { paddingLeft: "22px" } }}
            />
          </Box>
          <Box textAlign="right" sx={{ paddingRight: "22px" }}>
            <Link sx={{ textDecoration: "none" }}>You Forgot Password ?</Link>
          </Box>
          <Button
            variant="contained"
            sx={{ margin: "10px !important" }}
            onClick={handleLogin}
          >
            LOGIN
          </Button>
          <Typography textAlign="center">Or Sign Up Using</Typography>
          <Typography textAlign="center">
            <Link sx={{ textDecoration: "none" }} href="/register">
              Sign Up
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
