const PostModel = require("../models/postModel");

/**
 * Service = Tempat logika bisnis utama.
 * Controller TIDAK boleh mengandung logika bisnis.
 * Controller hanya: terima request → panggil service → kirim response.
 *
 * Kenapa? Agar logika bisnis bisa di-reuse dan di-test tanpa HTTP.
 */

class PostService {
    /**
  * Ambil semua posts, dengan optional search & filter.
  */
    static getAllPosts({ search, tag }) {
        return PostModel.findAll({ search, tag });
    }

    /**
     * Ambil satu post by ID.
     * Throw custom error jika tidak ditemukan (akan ditangkap error handler).
     */
    static getPostById(id) {
        const post = PostModel.findById(id);
        if (!post) {
            const error = new Error("Post Not Found");
            error.statusCode = 404; // Set custom status error untuk error handler
            throw error;
        }
        return post;
    }

    /**
  * Buat post baru.
  */
    static createPost(data) {
        return PostModel.create(data);
    }

    /**
   * Update post.
   * Cek dulu apakah post ada, baru update.
   */
  static updatePost(id, data) {
    const existing = PostModel.findById(id);
    if (!existing) {
        const error = new Error("Post Not Found");
        error.statusCode = 404;
        throw error;
    }
    return PostModel.update(id, data);
  }

   /**
   * Hapus post.
   * Cek dulu apakah post ada, baru hapus.
   */
  static deletePost(id) {
    const existing = PostModel.findById(id);
    if (!existing) {
        const error = new Error("Post Not Found");
        error.statusCode = 404;
        throw error; 
    }
    return PostModel.delete(id);
  }

}

module.exports = PostService;