const PostService = require("../services/postService");
const ApiResponse = require("../utils/ApiResponse");

/**
 * Controller = Jembatan antara HTTP dan Business Logic.
 *
 * Tugas controller HANYA:
 * 1. Ambil data dari request (params, query, body)
 * 2. Panggil service yang sesuai
 * 3. Kirim response menggunakan ApiResponse
 * 4. Jika error, lempar ke error handler via next(error)
 *
 * Controller TIDAK boleh:
 * - Akses database langsung
 * - Mengandung logika bisnis
 * - Melakukan validasi (sudah handled oleh middleware)
 */

class PostController {
    /**
 * GET /api/posts
 * Ambil semua posts dengan optional search & filter.
 *
 * Contoh: GET /api/posts?search=express&tag=backend
 */

    static getAll(req, res, next) {
        try {
            // Ambil query parameters yang sudah divalidasi middleware
            const { search, tag } = req.query;
            const posts = PostService.getAllPosts({ search, tag });

            return ApiResponse.success(res, {
                message: "Post retrived successfully",
                data: posts,
            });
        } catch (error) {
            // lempar error ke centralized error handler
            next(error);
        }
    }

    /**
   * GET /api/posts/:id
   * Ambil satu post berdasarkan ID.
   */
    static getById(req, res, next) {
        try {
            const post = PostService.getPostById(req.params.id);
            return ApiResponse.success(res, {
                message: "Post retrived successfuly",
                data: post,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
  * POST /api/posts
  * Buat post baru.
  *
  * Response menggunakan statusCode 201 (Created).
  * Ini best practice REST: 201 = resource baru berhasil dibuat.
  */
    static create(req, res, next) {
        try {
            const post = PostService.createPost(req.body);

            return ApiResponse.success(res, {
                message: "Post created successfully",
                data: post,
                statusCode: 201, // 201 created, bukan 200 ok
            });
        } catch (error) {
            next(error);
        }
    }

    /**
 * PUT /api/posts/:id
 * Update seluruh data post (full replacement).
 *
 * Catatan: PUT = replace all fields, PATCH = replace partial fields.
 * Kita pakai PUT di sini karena validasi mewajibkan semua field ada.
 */
    static update(req, res, next) {
        try {
            const post = PostService.updatePost(req.params.id, req.body);

            return ApiResponse.success(res, {
                message: "Post updated successfullly",
                data: post,
            });
        } catch (error) {
            next(error);
        }
    }


    /**
 * DELETE /api/posts/:id
 * Hapus post berdasarkan ID.
 */
    static delete(req, res, next) {
        try {
            PostService.deletePost(req.params.id);

            return ApiResponse.success(res, {
                message: "Post deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PostController;