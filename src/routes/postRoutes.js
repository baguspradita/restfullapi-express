const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const {
    validate,
    createPostValidation,
    updatePostValidation,
    idParamValidation,
    queryPostValidation,
} = require("../middleware/validate");

/**
 * Routes = Peta URL → Controller.
 *
 * Setiap route terdiri dari:
 * 1. HTTP Method (GET, POST, PUT, DELETE)
 * 2. URL Path
 * 3. Middleware (validasi, auth, dll) ← bisa lebih dari satu
 * 4. Controller function
 *
 * RESTful Convention yang kita ikuti:
 * GET    /api/posts      → List semua posts
 * GET    /api/posts/:id  → Detail satu post
 * POST   /api/posts      → Buat post baru
 * PUT    /api/posts/:id  → Update post
 * DELETE /api/posts/:id  → Hapus post
 */

// GET /api/posts?search=keyword&tag=tagname
// Middleware chain: queryPostValidation → PostController.getAll
router.get(
    "/",
    validate(queryPostValidation),
    PostController.getAll
);

// GET /api/posts/:id
// Middleware chain: idParamValidation → PostController.getById
router.get(
    "/:id",
    validate(idParamValidation),
    PostController.getById
);

// POST /api/posts
// Middleware chain: createPostValidation → PostController.create
router.post(
    "/",
    validate(createPostValidation),
    PostController.create
);

// PUT /api/posts/:id
// Middleware chain: updatePostValidation → PostController.update
router.put(
    "/:id",
    validate(updatePostValidation),
    PostController.update
);

// DELETE /api/posts/:id
// Middleware chain: idParamValidation → PostController.delete
router.delete(
    "/:id",
    validate(idParamValidation),
    PostController.delete
);

module.exports = router;