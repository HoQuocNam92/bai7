import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

const ManagerProduct = () => {
  const Token = localStorage.getItem("accessToken");
  const Users = localStorage.getItem("user");
  const user = JSON.parse(Users);

  const [isAuthorized, setIsAuthorized] = useState(null);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    stock_quantity: "",
    image: "",
  });
  const fetchProducts = async () => {
    if (!Token) {
      return;
    }
    try {
      const response = await axios.get("http://localhost:8080/api/admin", {
        headers: { Authorization: `Bearer ${Token}` },
      });

      if (response.status === 200) {
        setProducts(response.data);
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [Token]);
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      await axios
        .delete(`http://localhost:8080/api/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${Token}` },
        })
        .then(() =>
          setProducts(products.filter((product) => product.id !== id)),
        );
      await fetchProducts();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const image = URL.createObjectURL(files[0]);
      setNewProduct({ ...newProduct, [name]: files[0] });
      setImageFile(image);
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("author", newProduct.author);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("stock_quantity", newProduct.stock_quantity);
    formData.append("image", newProduct.image);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/products",
        formData,
        {
          headers: { Authorization: `Bearer ${Token}` },
        },
      );

      setProducts([...products, response.data]),
        setOpen(false),
        setNewProduct({
          title: "",
          author: "",
          description: "",
          price: "",
          stock_quantity: "",
          image: "",
        });
      await fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Thêm sản phẩm
          </Button>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <TableContainer>
              <TableHead>
                <TableRow>
                  <TableCell>Ảnh</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Tác giả</TableCell> {/* Thêm cột Tác giả */}
                  <TableCell>Mô tả</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Giá</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Số lượng</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-16 h-16 object-cover"
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.author}</TableCell>{" "}
                    {/* Hiển thị tác giả */}
                    <TableCell>{product.description}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {product.price} VNĐ
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {product.stock_quantity}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button color="primary">
                        <Edit />
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </TableContainer>

          <Modal open={open} onClose={() => setOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                p: 4,
                boxShadow: 24,
                borderRadius: 2,
              }}
            >
              <h2 className="text-lg font-bold mb-4">Thêm sản phẩm mới</h2>
              <TextField
                label="Tên sản phẩm"
                name="title"
                fullWidth
                margin="normal"
                value={newProduct.title}
                onChange={handleInputChange}
              />
              <TextField
                label="Tác giả"
                name="author"
                fullWidth
                margin="normal"
                value={newProduct.author}
                onChange={handleInputChange}
              />
              <TextField
                label="Mô tả"
                name="description"
                fullWidth
                margin="normal"
                value={newProduct.description}
                onChange={handleInputChange}
              />
              <TextField
                label="Giá"
                name="price"
                fullWidth
                margin="normal"
                value={newProduct.price}
                onChange={handleInputChange}
              />
              <TextField
                label="Số lượng"
                name="stock_quantity"
                fullWidth
                margin="normal"
                value={newProduct.stock_quantity}
                onChange={handleInputChange}
              />
              <TextField
                name="image"
                fullWidth
                type="file"
                margin="normal"
                onChange={handleInputChange}
              />
              {imageFile && (
                <img
                  src={imageFile}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "auto",
                    marginTop: "10px",
                  }}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
                sx={{ mt: 2 }}
              >
                Thêm sản phẩm
              </Button>
            </Box>
          </Modal>
        </div>
      </>
    </div>
  );
};

export default ManagerProduct;
