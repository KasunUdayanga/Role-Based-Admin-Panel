# Role-Based-Admin-Panel
individual production-level task based on your role 
# Role-Based Admin Panel Backend

A secure Node.js/Express backend API with JWT authentication and role-based access control.

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Admin, Moderator, User roles
- **MongoDB Integration** - Mongoose ODM with user schema
- **Security Features** - Helmet, CORS, Rate limiting
- **Input Validation** - Express-validator middleware
- **Error Handling** - Comprehensive error handling
- **User Management** - CRUD operations for users
- **Database Seeding** - Demo users for testing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Update MongoDB URI and other settings

3. **Seed the database**:
   ```bash
   npm run seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/role-based-admin
DB_NAME=role-based-admin

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=24h

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Users (Admin/Moderator only)
- `GET /api/users` - Get all users
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🔐 Demo Credentials

```
Admin: admin@example.com / admin123
Moderator: moderator@example.com / moderator123
User: user@example.com / user123
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── rbac.js
│   │   └── validation.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── seeders/
│   │   └── userSeeder.js
│   ├── utils/
│   │   └── jwt.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- Role-based permissions

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm run seed` - Seed database with demo data

## 🚦 Testing

Test the API using tools like Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```