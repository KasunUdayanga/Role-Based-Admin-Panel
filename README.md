# Role-Based Admin Panel

A full-stack MERN application implementing role-based access control with separate dashboards for administrators and regular users.

## Features

- **Authentication System**

  - Secure user registration and login
  - JWT token-based authentication
  - Session persistence using localStorage
  - Protected routes based on user roles

- **Admin Dashboard**

  - View and manage all users (except current admin)
  - Change user roles between admin and regular user
  - Delete user accounts
  - Statistics on total users, regular users, and other admins

- **User Dashboard**

  - View personal profile information
  - Edit profile details (name, email, password)
  - View all other users in read-only mode

- **Security Features**
  - Password hashing and secure storage
  - Role-based middleware protection for API routes
  - Confirmation dialogs for destructive actions
  - Input validation and sanitization

## Tech Stack

### Frontend

- React (with React Router for navigation)
- TailwindCSS for styling
- Axios for API requests
- React Toastify for notifications
- Context API for state management

### Backend

- Node.js with Express
- MongoDB with Mongoose ORM
- JWT for authentication
- bcrypt for password security

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or Atlas)

### Backend Setup

1. Navigate to the Backend directory:

   ```
   cd Backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=1d
   ```

4. Start the server:
   ```
   npm start
   ```
   For development with hot-reloading:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the Frontend directory:

   ```
   cd Frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file (if needed for custom API URL):

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. For production build:
   ```
   npm run build
   ```

## Usage

### User Registration and Login

1. Navigate to the registration page
2. Create a new account with username, email, name, and password
3. Log in with your credentials

### Admin Features

When logged in as an admin:

- View statistics on user counts
- See all users except yourself in the management table
- Change roles of users between admin and regular user
- Delete regular users (admin accounts are protected)

### User Features

When logged in as a regular user:

- View and edit your profile information
- View a list of all other users in the system


## License

This project is licensed under the MIT License - see the LICENSE file for details.
