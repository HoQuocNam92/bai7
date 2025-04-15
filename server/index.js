const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const productRoutes = require("./src/routes/product.routes");
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const adminRoutes = require("./src/routes/admin.routes");
const cartRoutes = require("./src/routes/cart.routes");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use(morgan());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.listen(PORT, () => {
  console.log("http://localhost:8080");
});
