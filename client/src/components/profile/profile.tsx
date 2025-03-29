import { Typography, Box, Button } from "@mui/material";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
function profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/", { replace: true }); // Chuyển đến trang đăng nhập và thay thế trang hiện tại
    logout(); // Xóa token và tài khoản kh��i local storage
  };
  return (
    <Box>
      <Typography>
        <Button onClick={handleLogout}>Log Out</Button>
      </Typography>
    </Box>
  );
}

export default profile;
