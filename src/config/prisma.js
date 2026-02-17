// import PrismaClient untuk koneksi ke database
const { PrismaClient } = require("@prisma/client");

// membuat instance prisma
// prisma ini yang nanti dipakai untuk query ke database
const prisma = new PrismaClient();

// export supaya bisa digunakan di controller
module.exports = prisma;
