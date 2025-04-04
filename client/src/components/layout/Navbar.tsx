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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ClickAwayListener,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "@context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { borderRight } from "@mui/system";
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
  title: string;
  price: number;
  description: string;
  image_url: string;
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
  console.log("search ", search);
  const [showResults, setShowResults] = useState(false);

  const [data, setData] = useState<Product[]>([]);
  const [results, setResults] = useState<any>([]);
  console.log("data ", data);

  resultSearch(results);
  useEffect(() => {
    const querySearch = async () => {
      const response = await axios.get("http://localhost:8080/findProduct");
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Error fetching search results:", response.status);
      }
    };
    querySearch();
  }, []);
  useEffect(() => {
    const result = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
    console.log("result  check", result);
    if (result.length) {
      setResults(result);
    }
  }, [search]);
  const hanldeSearch = () => {};
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
            <img src="/images/logo.webp" alt="" />
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
                setShowResults(true);
              }}
              InputProps={{
                sx: { borderRadius: "4px" }, // Bo tròn góc
              }}
              label="Search books, authors, ISBNs"
              variant="outlined"
              fullWidth
              onBlur={() => setSearch("")}
            />
            <Button
              onClick={hanldeSearch}
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
            {showResults && results.length > 0 && (
              <ClickAwayListener
                onClickAway={() => {
                  setShowResults(false);
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    bgcolor: "#fff",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)", // Đổ bóng
                    borderRadius: "4px",
                    zIndex: 1000,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {results.map((item: Product) => (
                          <TableRow
                            key={item.id}
                            onMouseDown={(e) => e.preventDefault()} // Ngăn onBlur bị kích hoạt trước
                            sx={{
                              cursor: "pointer",
                              "&:hover": { bgcolor: "#f5f5f5" },
                            }}
                          >
                            <TableCell width="60px">
                              <img width="40px" src={item.image_url} alt="" />
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </ClickAwayListener>
            )}
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
