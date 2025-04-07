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
  TableRow,
  TableCell,
  TableBody,
  ClickAwayListener,
} from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "@context/AuthContext";
import { useContext, useEffect, useMemo, useState, memo } from "react";

import { useNavigate } from "react-router-dom";
import { ProductContext } from "@context/ProductContext";
import Cart from "@components/Cart/Cart";
const categories = [
  { name: "Ebooks", link: "#" },
  { name: "Gift Cards", link: "#" },
  { name: "Special Offers", link: "#" },
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
import { CartContext } from "@context/CartContext";
const Navbar = memo(() => {
  const [OnCart, setOnCart] = useState(false);
  const handleOnCart = () => {
    setOnCart(!OnCart);
  };
  const { quantity } = useContext(CartContext) as any;
  const { loginStatus, resultSearch, user, logout } = useAuth();
  const { product } = useContext(ProductContext) as any;
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>([]);
  const Navigation = useNavigate();
  const handleHome = () => {
    Navigation("/");
  };

  resultSearch(results);
  const filteredResults = useMemo(() => {
    return product.filter((item: any) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [product, search]);
  useEffect(() => {
    setResults(filteredResults);
  }, [filteredResults]);
  const hanldeSearch = () => {};
  return (
    <AppBar sx={{ backgroundColor: "#fff", position: "relative" }}>
      <Toolbar sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ flex: 1, px: 2, width: "100%" }}
        >
          <Box sx={{ py: 1, cursor: "pointer" }}>
            <img src="/images/logo.webp" alt="" onClick={handleHome} />
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
                sx: { borderRadius: "4px" },
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
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
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
                            onMouseDown={(e) => e.preventDefault()}
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
                <ListItem
                  className="user"
                  sx={{ whiteSpace: "nowrap", position: "relative" }}
                >
                  <Link
                    sx={{ textDecoration: "none" }}
                    color="#000"
                    href="/profile"
                    paddingRight="4px"
                  >
                    <AccountCircleIcon />
                  </Link>
                  <Box>
                    <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
                      {user.name}
                    </Link>
                  </Box>
                  <ul className="noti-nav">
                    <li>
                      <Link
                        className="option"
                        sx={{ textDecoration: "none" }}
                        href="/profile"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="option"
                        sx={{ textDecoration: "none" }}
                        onClick={logout}
                      >
                        Log Out
                      </Link>
                    </li>
                  </ul>
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
              <IconButton
                id="IconCart"
                aria-label="cart"
                onClick={handleOnCart}
              >
                <StyledBadge
                  defaultValue={0}
                  badgeContent={quantity}
                  sx={{ padding: "0px" }}
                  color="secondary"
                >
                  <Box sx={{ display: OnCart ? "block" : "none" }}>
                    <Cart />
                  </Box>
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
});

export default Navbar;
