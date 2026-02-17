const bcrypt = require("bcrypt"); // untuk hash password
const jwt = require("jsonwebtoken"); // untuk generate token
const prisma = require("../config/prisma"); // koneksi ke database

// ================= REGISTER =================
exports.registerUser = async (req, res) => {
  try {
    // ambil data dari body request
    const { name, email, password } = req.body;

    // cek apakah email sudah ada di database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // kalau sudah ada, tidak boleh daftar lagi
    if (existingUser) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }

    // hash password supaya tidak disimpan dalam bentuk asli
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan user baru ke database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // kirim response berhasil
    res.status(201).json({
      message: "Registrasi berhasil",
      user: newUser,
    });
  } catch (error) {
    // jika ada error dari server
    res.status(500).json({ error: error.message });
  }
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // kalau user tidak ditemukan
    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    // bandingkan password input dengan password yang sudah di-hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    // buat token JWT yang berisi userId
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // kirim token ke client
    res.json({
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= GET CURRENT USER =================
exports.getCurrentUser = async (req, res) => {
  try {
    // ambil userId dari token (disimpan di req.user oleh middleware)
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
