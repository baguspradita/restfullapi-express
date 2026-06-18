# Blog RESTful API

RESTful API untuk platform blog, dibangun dengan **Express.js** mengikuti best practice termasuk arsitektur berlapis (*layered architecture*), centralized error handling, input validation, dan security hardening.

## Fitur

- **CRUD Posts** — Create, Read, Update, Delete blog posts
- **Search & Filter** — Cari posts berdasarkan keyword dan filter berdasarkan tag
- **Input Validation** — Validasi otomatis di setiap endpoint menggunakan `express-validator`
- **Centralized Error Handling** — Semua error ditangani di satu tempat dengan response yang konsisten
- **Security** — HTTP headers diamankan dengan Helmet, CORS, dan Rate Limiting
- **Structured Logging** — Setiap request tercatat dengan Morgan
- **Consistent Response Format** — Format JSON standar di semua endpoint

## Tech Stack

| Teknologi | Kegunaan |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js v4](https://expressjs.com/) | Web framework |
| [Helmet](https://helmetjs.github.io/) | Security HTTP headers |
| [CORS](https://www.npmjs.com/package/cors) | Cross-Origin Resource Sharing |
| [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) | Rate limiting |
| [express-validator](https://express-validator.github.io/docs/) | Input validation |
| [Morgan](https://www.npmjs.com/package/morgan) | HTTP request logger |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variables |

## Arsitektur

Proyek ini menggunakan **Layered Architecture** (Separation of Concerns):

| Layer | Tanggung Jawab |
|---|---|
| **Routes** | Mendefinisikan URL endpoint dan HTTP methods |
| **Middleware** | Validasi input, logging, security, error handling |
| **Controllers** | Menerima request, memanggil service, mengirim response |
| **Services** | Business logic utama |
| **Models** | Berinteraksi dengan data/database |
| **Utils** | Helper functions yang digunakan di berbagai layer |

## Struktur Proyek
restfullapi-express/
├── src/
│ ├── controllers/
│ │ └── postController.js # Request handlers
│ ├── routes/
│ │ └── postRoutes.js # Endpoint definitions
│ ├── services/
│ │ └── postService.js # Business logic
│ ├── models/
│ │ └── postModel.js # Data layer
│ ├── middleware/
│ │ ├── errorHandler.js # Centralized error handler
│ │ └── validate.js # Input validation middleware
│ ├── utils/
│ │ └── ApiResponse.js # Standard response wrapper
│ └── app.js # Entry point
├── .env # Environment configuration
├── .gitignore
├── package.json
└── README.md

## Getting Started

### Prasyarat

- [Node.js](https://nodejs.org/) versi 18 atau lebih baru

### Instalasi

```bash
# Clone repository
git clone https://github.com/username/restfullapi-express.git

# Masuk ke direktori proyek
cd restfullapi-express

# Install dependencies
npm install

# Jalankan server (development mode dengan auto-reload)
npm run dev

# Atau jalankan di production mode
npm start