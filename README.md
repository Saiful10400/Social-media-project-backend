# Gardenia Backend

The backend of Gardenia is responsible for managing the core functionality of the blogging platform for farming enthusiasts. It handles user authentication, profile verification, post management, voting, comments, and PDF generation for downloading posts.

## 🌐 Live API

- **Backend URL:** [Gardenia Backend](https://apollow-assignment-6-back-end.vercel.app)

## 🛠️ Features

1. **User Authentication:**
   - Sign up and login with JWT-based authentication.

2. **Profile Verification:**
   - Users can verify their profile by making a payment to gain access to premium content.

3. **Post Management:**
   - Create, update, and delete farming-related posts.
   
4. **User Interaction:**
   - Users can upvote/downvote posts, comment on posts, and follow other users.

5. **Post Download:**
   - Download any post as a PDF for offline reading.

6. **Admin Controls:**
   - Admin users can manage users, content, and payments.

## 🛡️ Admin Credentials

For testing admin features, use the following credentials:

- **Admin Email:** user@g.com
- **Admin Password:** 4444

## ⚙️ Technologies Used

- **Node.js** - For handling server-side logic.
- **Express.js** - As the web framework to build APIs.
- **MongoDB** - For database operations.
- **Mongoose** - For object data modeling (ODM).
- **JWT (JSON Web Tokens)** - For securing routes and handling authentication.
- **PDFKit** - For generating PDF files from posts.
- **Stripe (or similar)** - For handling payments for profile verification.

## 📁 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login an existing user.

### User Profile

- `GET /api/users/:id` - Get a user's profile details.
- `PUT /api/users/:id` - Update a user's profile.
- `POST /api/users/verify` - Verify a user's profile after payment.

### Posts

- `POST /api/posts` - Create a new post.
- `GET /api/posts` - Get a list of all posts.
- `GET /api/posts/:id` - Get details of a specific post.
- `PUT /api/posts/:id` - Update a post.
- `DELETE /api/posts/:id` - Delete a post.
- `GET /api/posts/:id/download` - Download the post as a PDF.

### Voting & Comments

- `POST /api/posts/:id/upvote` - Upvote a post.
- `POST /api/posts/:id/downvote` - Downvote a post.
- `POST /api/posts/:id/comment` - Comment on a post.

### Admin

- `GET /api/admin/users` - Manage users.
- `GET /api/admin/payments` - View payment history for profile verification.

## 🚀 Getting Started

### Prerequisites

- **Node.js** and **npm** installed.
- **MongoDB** set up and running.
- Environment variables configured in a `.env` file.

  
## How to Run the Project Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/Saiful10400/Apollow-Assignment-5-back-end
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo-name
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and visit:

    ```bash
    http://localhost:5173
    ```

## How to Contribute

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

