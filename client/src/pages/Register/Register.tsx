import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { Stack } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
const register = () => {
  const { register } = useAuth(); // Gọi hàm đăng ký từ AuthContext
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(name, email, password);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("Đăng ký thành công! Chuyển đến trang đăng nhập.");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Đăng ký thất bại!");
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
            Sign Up
          </Typography>
          <Box sx={{ position: "relative", paddingInline: "10px" }}>
            <EmailIcon
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
            <PersonIcon
              sx={{ position: "absolute", top: "14px", left: "18px" }}
            />
            <TextField
              label="Name"
              variant="outlined"
              onChange={(e) => {
                setName(e.target.value);
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
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth
              InputLabelProps={{ sx: { paddingLeft: "22px" } }}
              InputProps={{ sx: { paddingLeft: "22px" } }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleRegister}
            sx={{ margin: "10px !important" }}
          >
            SIGN UP
          </Button>
          <Typography textAlign="center">Or Sign Up Using</Typography>
          <Typography textAlign="center">
            <Link sx={{ textDecoration: "none" }} href="/login">
              Log In
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default register;
