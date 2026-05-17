const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors({ origin: "https://simple-server-v1.vercel.app" }));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
