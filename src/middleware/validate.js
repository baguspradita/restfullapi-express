const { body, param, query, validationResult } = require("express-validator");

/**
 * Generic validation middleware factory.
 * Menerima array validasi, jalankan semua, lalu cek apakah ada error.
 *
 * Kenapa pakai factory function?
 * Agar kita bisa reuse logic "jalankan validasi & cek result" di banyak route
 * tanpa duplikasi kode.
 */

const validate = (validations) => {
    return async (req, res, next) => {
        // jalankan semua validasi secara paralel 
        await Promise.all(validations.map((v) => v.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) return next(); // jika tidak ada error -> lanjut ke controller

        // format error agar lebih rapi dan mudah dibaca frontend
        const extractedErrors = errors.array().map((e) => ({
            field: e.path, // field mana yang error (misal: "title")
            message: e.msg, // pesan error (misal: "Title is required")
        }));

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: extractedErrors,
        });
    };
};


// ──────────────────────────────────────────────
// Definisi rules validasi untuk setiap operasi
// ──────────────────────────────────────────────

/**
 * Validasi untuk membuat post baru (POST /api/posts)
 * Semua field di body wajib ada dan sesuai format.
 */

const createPostValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 200 })
        .withMessage("Title must be less than 200 characters"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters"),

    body("author")
        .trim()
        .notEmpty()
        .withMessage("Author is required"),

    body("tags")
        .isArray()
        .withMessage("Tags must be an array")
        .custom((tags) => tags.every((t) => typeof t === "string"))
        .withMessage("Tags must be an array of strings"),
];

/**
  * Validasi untuk update post (PUT /api/posts/:id)
  * Sama seperti create, tapi cek juga param :id harus integer.
  */
const updatePostValidation = [
    param("id").isInt().withMessage("ID must be an integer"),
    ...createPostValidation, // reuse validasi yang sama
];

/**
 * Validasi untuk endpoint yang hanya butuh param :id
 * (GET by ID, DELETE)
 */
const idParamValidation = [
    param("id").isInt().withMessage("ID must be an integer"),
];

/**
 * Validasi untuk query parameters (search & filter)
 * Digunakan di GET /api/posts?search=xxx&tag=xxx
 */
const queryPostValidation = [
    query("search")
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage("Search must be at least 2 characters"),

    query("tag")
        .optional()
        .trim(),
];

module.exports = {
    validate,
    createPostValidation,
    updatePostValidation,
    idParamValidation,
    queryPostValidation,
};

