import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  List,
  ListItem,
  Link,
  TextField,
  Button,
  Badge,
  BadgeProps,
  IconButton,
  styled,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "@context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
const categories = [
  { name: "Ebooks", link: "#" },
  { name: "Gift Cards", link: "#" },
  { name: "Special Offers", link: "#" },
  { name: "Refer A Friend", link: "#" },
  { name: "New Books", link: "#" },
  { name: "Best Sellers", link: "#" },
  { name: "Fiction", link: "#" },
  { name: "Nonfiction", link: "#" },
  { name: "YA", link: "#" },
  { name: "Kids", link: "#" },
  { name: "Games & Puzzles", link: "#" },
];
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    padding: "0 4px",
  },
}));
const Navbar = () => {
  const { loginStatus, resultSearch } = useAuth();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Product[]>([]);
  const [results, setResults] = useState<any>([]);
  const token = localStorage.getItem("accessToken");
  resultSearch(results);
  useEffect(() => {
    if (!token) return;
    const querySearch = async () => {
      const response = await axios.get("http://localhost:8080/search", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Error fetching search results:", response.status);
      }
    };
    querySearch();
  }, []);
  const searchProduct = () => {
    const result = data.filter((item) =>
      item.name.toUpperCase().includes(search.toUpperCase()),
    );
    if (result.length) {
      setResults(result);
    }
    return result;
  };
  return (
    <AppBar sx={{ backgroundColor: "#fff" }}>
      <Toolbar sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ flex: 1, px: 2, width: "100%" }}
        >
          <Box sx={{ py: 1 }}>
            <img
              src="https://rails-assets-us.bookshop.org/ds/images/registered-logo.feff201f7516c84bf6ac44d84c98126760594a80.svg"
              alt=""
            />
          </Box>
          <Box
            sx={{
              position: "relative",
              py: 1,
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <TextField
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              InputProps={{
                sx: { borderRadius: "20px" }, // Bo tròn góc
              }}
              label="Search books, authors, ISBNs"
              variant="outlined"
              fullWidth
            />
            <Button
              onClick={searchProduct}
              sx={{
                position: "absolute",
                right: "4px",
                top: "18px",
              }}
            >
              <SearchIcon
                sx={{
                  color: "#000",
                }}
              />
            </Button>
          </Box>

          <Box>
            <List sx={{ display: "flex" }}>
              <ListItem sx={{ whiteSpace: "nowrap" }}>
                <Link
                  sx={{ textDecoration: "none" }}
                  color="#000"
                  href="https://mui.com"
                >
                  Choose a Bookstore
                </Link>
              </ListItem>
              {loginStatus ? (
                <ListItem sx={{ whiteSpace: "nowrap" }}>
                  <Link
                    sx={{ textDecoration: "none" }}
                    color="#000"
                    href="/profile"
                  >
                    <AccountCircleIcon />
                  </Link>
                </ListItem>
              ) : (
                <Box display="flex">
                  <ListItem sx={{ whiteSpace: "nowrap" }}>
                    <Link
                      sx={{ textDecoration: "none" }}
                      color="#000"
                      href="/login"
                    >
                      Log In
                    </Link>
                  </ListItem>
                  <ListItem sx={{ whiteSpace: "nowrap" }}>
                    <Link
                      sx={{ textDecoration: "none" }}
                      color="#000"
                      href="/register"
                    >
                      Sign In
                    </Link>
                  </ListItem>
                </Box>
              )}
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <ListItem>
                <Link color="#000" href="https://mui.com"></Link>
              </ListItem>
            </List>
          </Box>
        </Stack>
        <Stack>
          <Box>
            <List sx={{ display: "flex" }}>
              {categories.map((item, index) => (
                <ListItem sx={{ whiteSpace: "nowrap" }} key={index}>
                  <Link
                    sx={{ textDecoration: "none", color: "#000" }}
                    href={item.link}
                  >
                    {item.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
