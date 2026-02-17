// import app yang sudah dikonfigurasi di app.js
const app = require("./app");

// ambil port dari file .env, kalau tidak ada pakai 3000
const PORT = process.env.PORT || 3000;

// menjalankan server agar bisa menerima request dari client
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
