const jwt = require("jsonwebtoken");

// middleware ini digunakan untuk mengecek token
exports.verifyToken = (req, res, next) => {
  // ambil header authorization
  const authHeader = req.headers.authorization;

  // kalau tidak ada token
  if (!authHeader) {
    return res.status(401).json({
      message: "Akses ditolak, token tidak ada",
    });
  }

  // format biasanya: Bearer token
  const token = authHeader.split(" ")[1];

  try {
    // verifikasi token menggunakan secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // simpan data user dari token ke req.user
    req.user = decoded;

    // lanjut ke controller berikutnya
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token tidak valid",
    });
  }
};
