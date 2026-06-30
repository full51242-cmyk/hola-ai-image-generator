# Landscope Generator - AI Image Generator SaaS Platform

A complete, production-ready AI Image Generator SaaS website built with React, Node.js, Express, and Tailwind CSS.

## Features

### Frontend (React + Tailwind CSS)
- **10 Pages**: Home, Generate, Gallery, Pricing, Login, Signup, Dashboard, Profile, Admin, Contact
- **Modern UI**: Glassmorphism effects, smooth animations, responsive design
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **State Management**: React Context API with useState hooks
- **Routing**: React Router DOM for navigation
- **Image Generation**: Text-to-image with multiple styles and aspect ratios
- **Gallery**: Masonry grid with search, filter, like, and favorites
- **Authentication**: Login, signup, forgot password with form validation
- **Dashboard**: User stats, generation history, favorites
- **Admin Panel**: User management, subscriptions, content moderation
- **Pricing**: Three-tier pricing with monthly/yearly billing toggle

### Backend (Node.js + Express)
- **REST API**: Clean API structure
- **Authentication**: JWT with bcrypt password hashing
- **User Management**: Registration, login, profile updates
- **Image Generation**: Placeholder service for AI integration
- **Payment Integration**: Stripe-ready payment processing
- **Error Handling**: Comprehensive error middleware

## Tech Stack

### Frontend
- React 19
- React Router DOM 7
- Tailwind CSS 3.4
- Vite 8
- JavaScript (ES6+)

### Backend
- Node.js
- Express 5
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- CORS enabled
- dotenv for environment variables

## Installation

### Prerequisites
- Node.js v18+
- npm or yarn

### Clone the Repository
```bash
cd landscope-generator
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your values:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/landscope
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

5. Start the server:
```bash
npm start
```

The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will run on http://localhost:5173

## Usage

### Demo Credentials
- **Email**: Any valid email format
- **Password**: Any password (min 6 characters)
- The app accepts any login for demonstration purposes

### Generate Images
1. Sign up or login
2. Navigate to "Generate" page
3. Enter a text prompt
4. Select art style (Realistic, Anime, 3D Render, Cartoon, Digital Art, Fantasy)
5. Choose aspect ratio (1:1, 16:9, 9:16, 4:5)
6. Select number of images (1-4)
7. Click "Generate Images"
8. Download or favorite generated images

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:resetToken` - Reset password

#### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)
- `PUT /api/users/:id/credits` - Update user credits (admin only)

#### Images
- `POST /api/images` - Generate images
- `GET /api/images/my-images` - Get user's generated images
- `GET /api/images` - Get all images (admin only)
- `DELETE /api/images/:id` - Delete image

#### Payments
- `GET /api/payments/plans` - Get all pricing plans
- `POST /api/payments/checkout` - Create checkout session
- `POST /api/payments/webhook` - Stripe webhook

## Project Structure

```
landscope-generator/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/         # React Context providers
│   │   │   └── AppContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── GeneratePage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   ├── PricingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── ForgotPasswordPage.jsx
│   │   ├── services/       # API services
│   │   │   └── imageService.js
│   │   ├── App.jsx         # Main App component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Tailwind CSS
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── server.js         # Express server
│   ├── package.json
│   └── .env.example
│
├── README.md
└── package.json
```

## State Management

The application uses React Context API with the following state:

```javascript
{
  // Authentication
  isAuthenticated: boolean,
  currentUser: object,
  login: function,
  logout: function,
  
  // Theme
  darkMode: boolean,
  toggleDarkMode: function,
  
  // UI State
  sidebarOpen: boolean,
  searchQuery: string,
  
  // User Data
  userCredits: number,
  generationHistory: array,
  favorites: array,
  addToFavorites: function,
  removeFromFavorites: function,
  addToHistory: function,
  
  // Loading
  loading: boolean,
  deductCredits: function,
}
```

## AI Integration

The image generation service (`frontend/src/services/imageService.js`) is a placeholder ready for integration with any AI image generation API.

### To Integrate Real AI API:

1. Update the API endpoint in `imageService.js`:
```javascript
const API_ENDPOINT = 'https://api.your-ai-service.com/v1/generate';
```

2. Add your API key to environment variables:
```env
REACT_APP_AI_API_KEY=your-api-key
```

3. Update the `generateImage` function with your API's request/response format.

## Customization

### Colors
Edit `frontend/tailwind.config.js` to customize the color palette:
```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... customize primary colors
  }
}
```

### Pages
Add new pages by:
1. Creating a new component in `src/pages/`
2. Adding a route in `src/App.jsx`
3. Creating API routes in `backend/routes/`

### Styles
The application uses glassmorphism effects and gradient backgrounds. Modify `src/index.css` to customize global styles.

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to Vercel or Netlify

### Backend (Railway/Render/Heroku)
1. Set environment variables on your hosting platform
2. Connect your GitHub repository
3. Deploy

### Deploy to Railway (serve frontend from backend)

1. Build the frontend locally (or in the Railway build step):
```bash
cd frontend
npm install
npm run build
```

2. Ensure the backend serves the built frontend (this repo already supports it when `NODE_ENV=production`).

3. Commit and push your changes to GitHub.

4. On Railway:
- Create a new project and connect your GitHub repo.
- Use a "Node.js" service and point the root directory to `backend`.
- Set the following environment variables in Railway:
  - `NODE_ENV=production`
  - `CLIENT_URL=https://ai-image-banalo-production.up.railway.app` (or your frontend URL)
  - `PORT` (Railway provides a port automatically; leave unset or set to `5000`)
  - `MONGODB_URI` (if using a database)
  - `JWT_SECRET` (production secret)

5. For monorepo build (optional) set Railway's build command to:
```bash
cd frontend && npm ci && npm run build && cd ../backend && npm ci
```

6. Start command (in Railway service settings):
```bash
npm start
```

Notes:
- After deployment, Railway will provide a public URL (for example `https://<project>.up.railway.app`). If you want to use a custom domain, configure it in Railway and update `CLIENT_URL` accordingly.
- If you prefer deploying frontend separately (Vercel/Netlify), set `CLIENT_URL` to that public URL and deploy backend as an API-only service.

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/landscope
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Troubleshooting

### Common Issues

1. **CORS Error**
   - Ensure `CLIENT_URL` in backend `.env` matches your frontend URL
   - Verify CORS is properly configured in `server.js`

2. **Build Errors**
   - Clear node_modules: delete `node_modules` and `package-lock.json`, then run `npm install`
   - Clear build cache: delete `dist` folder in frontend

3. **JWT Token Issues**
   - Verify `JWT_SECRET` is set in backend environment variables
   - Check token expiration settings

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions, please create an issue in the repository or contact support.
