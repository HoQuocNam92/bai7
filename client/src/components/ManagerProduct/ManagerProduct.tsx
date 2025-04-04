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

const ManagerProduct = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false); // Trạng thái mở modal
  const [newProduct, setNewProduct] = useState({
    title: "",
    author: "", // Thêm tác giả
    description: "",
    price: "",
    stock_quantity: "",
    image_url: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/findProduct")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      axios
        .post(`http://localhost:8080/deleteProduct/${id}`)
        .then(() =>
          setProducts(products.filter((product) => product.id !== id)),
        );
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    axios
      .post("http://localhost:8080/createProduct", newProduct)
      .then((response) => {
        setProducts([...products, response.data]); // Cập nhật danh sách sản phẩm
        setOpen(false); // Đóng modal
        setNewProduct({
          title: "",
          author: "", // Reset tác giả
          description: "",
          price: "",
          stock_quantity: "",
          image_url: "",
        });
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Thêm sản phẩm
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
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
                <TableCell>{product.author}</TableCell> {/* Hiển thị tác giả */}
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
        </Table>
      </TableContainer>

      {/* Modal Thêm Sản Phẩm */}
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
            label="URL ảnh"
            name="image_url"
            fullWidth
            margin="normal"
            value={newProduct.image_url}
            onChange={handleInputChange}
          />
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
  );
};

export default ManagerProduct;
