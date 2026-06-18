// PENTING: dotenv.config() HARUS di baris paling atas.
// Agar semua process.env.XXX bisa dibaca oleh file lain yang di-require setelahnya.
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const postRoutes = require("./routes/postRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// ──────────────────────────────────────────────
// MIDDLEWARE SETUP
// Urutan middleware SANGAT PENTING!
// Middleware dijalankan secara berurutan dari atas ke bawah.
// ──────────────────────────────────────────────

// 1. Security: Set HTTP headers yang aman
// Helmet menambahkan headers seperti X-Content-Type-Options, X-Frame-Options, dll
// untuk melindungi dari serangan umum seperti XSS dan clickjacking.
app.use(helmet());

// 2. CORS: Izinkan request dari domain lain
// Di production, batasi hanya domain frontend Anda yang boleh akses.
app.use(cors());

// 3. Rate Limiting: Batasi jumlah request per IP
// Mencegah brute force attack dan penyalahgunaan API.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,   // jendela waktu : 15 menit
    max: 100,                   // maksimal 100 request per jendela waktu
    message: {
        success: false,
        message: "Too many requests, please try again later",
    },
});
app.use("/api", limiter); // hanya batasi request ke /api/*

// 4. Body Parser: Parse JSON dan URL-encoded body
// Tanpa ini, req.body akan undefined.
app.use(express.json());                            // params application/json
app.use(express.urlencoded({ extended: true }));    // parse application/x-www-form-urlencoded

// 5. Logger: Catat setiap request yang masuk
// Format "dev" menampilkan: method, URL, status, response time, size
app.use(morgan("dev"));

// ──────────────────────────────────────────────
// HEALTH CHECK
// Endpoint sederhana untuk mengecek apakah API berjalan.
// Berguna untuk monitoring dan load balancer.
// ──────────────────────────────────────────────
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Blog Api is Running",
        timestamp: new Date().toISOString(),
    });
});



// ──────────────────────────────────────────────
// ROUTES
// Daftarkan semua route modules di sini.
// Prefix "/api/posts" berarti semua route di postRoutes
// akan dimulai dengan /api/posts.
// ──────────────────────────────────────────────
app.use("/api/posts", postRoutes);

// ──────────────────────────────────────────────
// ERROR HANDLING
// PENTING: Error handler HARUS didaftarkan SETELAH semua routes.
// Urutan: notFoundHandler dulu, baru errorHandler.
// ──────────────────────────────────────────────
app.use(notFoundHandler); // Menangani route yang tidak ada
app.use(errorHandler); // Menangani semua error

// ──────────────────────────────────────────────
// START SERVER
// ──────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} [${process.env.NODE_ENV}]`);
});
