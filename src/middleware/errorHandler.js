/**
 * Middleware untuk menangani semua error di satu tempat.
 * Express otomatis memanggil middleware ini ketika next(error) dipanggil.
 *
 * PENTING: Error handler middleware HARUS punya 4 parameter (err, req, res, next).
 * Jika kurang dari 4, Express menganggapnya middleware biasa, bukan error handler.
 */

const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? "Internal Server Error" : err.message,
        // Tampilkan stack trace hanya di ddevelopment

        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });


};

/**
    * Middleware untuk menangani route yang tidak ditemukan (404).
    * Diletakkan SETELAH semua routes terdaftar.
    * Jika request sampai ke sini, berarti tidak ada route yang cocok.
    */

const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
};

module.exports = { errorHandler, notFoundHandler };
