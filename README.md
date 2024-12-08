# Express Starter with AWS S3, Prisma, Zod, and Multer

A robust and scalable starter template for building backend applications with Express, AWS S3 integration, Prisma ORM, Zod validation, and Multer for file uploads. This template also includes an authentication system with access and refresh tokens.

## 🚀 Features

- **Express** - Minimalist web framework for Node.js.
- **AWS S3** - Integrated for file storage and management.
- **Prisma ORM** - Type-safe and modern database management.
- **Zod** - Schema-based validation for inputs.
- **Multer** - Middleware for handling file uploads.
- **Access and Refresh Token Authentication** - Secure authentication system.

## 📦 Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   - Copy `.env.sample` to `.env` and fill in the required values.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🛠️ Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the development server.         |
| `npm run build` | Build the application for production. |
| `npm run start` | Start the production server.          |
| `npm run lint`  | Lint the codebase using ESLint.       |

## 🌐 Project Structure

```
.
├── prisma/           # Prisma schema and migrations
├── public/           # Static files
├── src/              # Source code
│   ├── config/       # Configuration files (e.g., AWS S3, database)
│   ├── controllers/  # Request handlers
│   ├── lib/          # Shared libraries
│   ├── middlewares/  # Express middlewares
│   ├── routes/       # API routes
│   ├── services/     # Business logic and services
│   ├── utils/        # Utility functions
│   ├── validations/  # Zod schemas for request validation
│   └── index.js      # Entry point of the application
├── .env.sample       # Environment variable template
├── .gitignore        # Git ignore file
├── package.json      # Node.js dependencies
├── package-lock.json # Lockfile for dependencies
├── README.md         # Documentation
```

## 🔐 Authentication Flow

1. **Access Tokens**:

   - Short-lived tokens used for authenticating API requests.
   - Stored securely in memory or HTTP-only cookies.

2. **Refresh Tokens**:

   - Long-lived tokens used to generate new access tokens.
   - Stored securely in a database.

3. **Token Rotation**:
   - Refresh tokens are rotated with every new issuance to prevent reuse.

## ✨ Configuration

### AWS S3

Update the following keys in the `.env` file:

```env
PORT=8000
CORS_ORIGIN=

NODE_ENV=development

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRES_IN=1h
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRES_IN=7d

STORAGE_REGION=
STORAGE_BUCKET_NAME=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=/vk3s+L

DATABASE_URL=
```

### Prisma

Ensure your database connection string is set in the `.env` file:

```env
DATABASE_URL=your-database-url
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

### Zod Validation

Define validation schemas for all API routes in `src/validations/`.

### Multer File Uploads

Set up Multer configurations in `src/middlewares/` to handle file uploads securely.

## 🙌 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/your-repo-name/issues).

## 💡 Acknowledgements

- [Express Documentation](https://expressjs.com/)
- [AWS S3 Documentation](https://aws.amazon.com/s3/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev/)
- [Multer Documentation](https://github.com/expressjs/multer)

---

### Made with ❤️ by Santhosh
