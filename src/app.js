// import package yang dibutuhkan
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

// load environment variable dari file .env
dotenv.config();

// membuat instance express
const app = express();

// mengaktifkan cors supaya bisa diakses dari origin lain (misalnya frontend)
app.use(cors());

// supaya server bisa membaca data json dari body request
app.use(express.json());

// semua route auth akan diawali dengan /api
app.use("/api", authRoutes);

// export app agar bisa dipakai di server.js
module.exports = app;
