/**
 * Model = Lapisan yang berinteraksi langsung dengan data.
 * Saat ini kita gunakan array sebagai simulasi database.
 * Nanti bisa diganti MongoDB, PostgreSQL, MySQL, dll
 * tanpa mengubah controller atau service.
 */

let posts = [
  {
    id: 1,
    title: "Belajar RESTful API dengan Express",
    content: "RESTful API adalah standar desain API yang menggunakan HTTP methods...",
    author: "Budi Santoso",
    tags: ["express", "nodejs", "backend"],
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: 2,
    title: "Tips Menjadi Backend Developer",
    content: "Backend developer bertanggung jawab atas logika server, database...",
    author: "Siti Aminah",
    tags: ["career", "backend", "tips"],
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
  },
];

let nextId = 3;

class PostModel {
  /**
   * Ambil semua posts.
   * Mendukung pencarian (search) dan filter berdasarkan tag.
   */
  static findAll({ search, tag } = {}) {
    let result = [...posts];

    // Filter by search keyword (cari di title dan content)
    if (search) {
      const keyword = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(keyword) ||
          p.content.toLowerCase().includes(keyword)
      );
    }

    // Filter by tag
    if (tag) {
      result = result.filter((p) => p.tags.includes(tag.toLowerCase()));
    }

    return result;
  }

  /**
   * Cari satu post berdasarkan ID.
   * Return undefined jika tidak ditemukan.
   */
  static findById(id) {
    return posts.find((p) => p.id === parseInt(id));
  }

  /**
   * Buat post baru.
   * Otomatis set id, createdAt, updatedAt.
   */
  static create({ title, content, author, tags = [] }) {
    const now = new Date();
    const post = {
      id: nextId++,
      title,
      content,
      author,
      tags: tags.map((t) => t.toLowerCase()),
      createdAt: now,
      updatedAt: now,
    };
    posts.push(post);
    return post;
  }

  /**
   * Update post yang sudah ada.
   * Return null jika post tidak ditemukan.
   */
  static update(id, { title, content, author, tags }) {
    const index = posts.findIndex((p) => p.id === parseInt(id));
    if (index === -1) return null;

    posts[index] = {
      ...posts[index],
      title,
      content,
      author,
      tags: tags.map((t) => t.toLowerCase()),
      updatedAt: new Date(), // Update timestamp setiap kali di-update
    };
    return posts[index];
  }

  /**
   * Hapus post berdasarkan ID.
   * Return data yang dihapus, atau null jika tidak ditemukan.
   */
  static delete(id) {
    const index = posts.findIndex((p) => p.id === parseInt(id));
    if (index === -1) return null;
    const [deleted] = posts.splice(index, 1);
    return deleted;
  }
}

module.exports = PostModel;