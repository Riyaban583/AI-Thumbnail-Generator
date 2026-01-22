# 🎨 THUMBLIFY – AI Thumbnail Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.x-61dafb.svg)

THUMBLIFY is a full-stack **AI-powered thumbnail generator** that leverages **Gemini AI** to create professional, eye-catching thumbnails from simple text prompts. Built with modern technologies, it's the perfect tool for **YouTubers, content creators, and digital marketers** who need stunning visuals fast.

---

## ✨ Key Features

### 🎯 Core Functionality
- **AI-Powered Generation**: Harness Gemini AI for intelligent, context-aware thumbnail creation
- **Prompt-Based Design**: Transform text descriptions into stunning visuals
- **Smart Customization**: Choose from multiple styles, color schemes, and aspect ratios
- **Real-Time Preview**: See your thumbnail come to life instantly
- **High-Quality Exports**: Download publication-ready images

### 🔒 Security & User Management
- **Secure Authentication**: JWT-based login and signup system
- **Protected Routes**: Middleware-based authorization
- **Session Management**: Persistent user sessions with secure token handling

### 💾 Advanced Features
- **Image Upload**: Support for custom image integration
- **Cloud Storage**: MongoDB-backed thumbnail history
- **Responsive Design**: Seamless experience across all devices
- **Reusable Components**: Modular UI architecture for maintainability

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with hooks and modern patterns |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **Context API** | Global state management |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **TypeScript** | Type-safe server code |
| **MongoDB** | NoSQL database |
| **Gemini AI** | AI thumbnail generation |
| **Multer** | File upload handling |
| **JWT** | Authentication tokens |

---

## 📂 Project Architecture

```
THUMBLIFY/
│
├── client/                      # Frontend application
│   ├── public/
│   │   └── assets/              # Static assets
│   ├── src/
│   │   ├── assets/              # Images, icons, fonts
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   └── Navbar/
│   │   ├── configs/             # Configuration files
│   │   │   └── api.config.ts
│   │   ├── context/             # React Context providers
│   │   │   ├── AuthContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── data/                # Static data and constants
│   │   ├── pages/               # Route pages
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Signup/
│   │   │   └── Dashboard/
│   │   ├── sections/            # Page sections
│   │   ├── utils/               # Helper functions
│   │   ├── hooks/               # Custom React hooks
│   │   ├── global.css           # Global styles
│   │   ├── main.tsx             # Application entry point
│   │   └── types.ts             # TypeScript type definitions
│   ├── .env.example             # Environment variables template
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                      # Backend application
│   ├── configs/                 # Configuration modules
│   │   ├── db.config.ts         # Database connection
│   │   └── gemini.config.ts     # Gemini AI setup
│   ├── controllers/             # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── thumbnail.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares/             # Express middlewares
│   │   ├── auth.middleware.ts
│   │   ├── upload.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/                  # MongoDB schemas
│   │   ├── User.model.ts
│   │   └── Thumbnail.model.ts
│   ├── routes/                  # API routes
│   │   ├── auth.routes.ts
│   │   ├── thumbnail.routes.ts
│   │   └── user.routes.ts
│   ├── utils/                   # Helper functions
│   │   ├── validators.ts
│   │   └── imageProcessor.ts
│   ├── uploads/                 # Temporary file storage
│   ├── .env.example             # Environment variables template
│   ├── server.ts                # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---


### 4️⃣ Run the Application

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 📡 API Endpoints

### Authentication
```http
POST   /api/auth/signup          # Register new user
POST   /api/auth/login           # User login
POST   /api/auth/logout          # User logout
GET    /api/auth/verify          # Verify JWT token
```

### Thumbnails
```http
POST   /api/thumbnails/generate  # Generate AI thumbnail
GET    /api/thumbnails           # Get user's thumbnails
GET    /api/thumbnails/:id       # Get specific thumbnail
DELETE /api/thumbnails/:id       # Delete thumbnail
POST   /api/thumbnails/upload    # Upload custom image
```

### User
```http
GET    /api/user/profile         # Get user profile
PUT    /api/user/profile         # Update profile
GET    /api/user/stats           # Get usage statistics
```

---

## 🔐 Security Best Practices

- ✅ Environment variables stored in `.env` (never committed)
- ✅ `.gitignore` configured to exclude sensitive files
- ✅ JWT tokens with secure expiration
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ CORS configuration for production
- ✅ Rate limiting on API endpoints
- ✅ File upload validation (type, size)

---

## 🎯 Use Cases

| Use Case | Description |
|----------|-------------|
| **YouTube Creators** | Generate engaging thumbnails that boost CTR |
| **Social Media** | Create eye-catching graphics for posts |
| **Digital Marketing** | Design professional banners and ads |
| **Bloggers** | Produce featured images for articles |
| **E-learning** | Build course thumbnails and materials |

---



## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


## 🙏 Acknowledgments

- Google Gemini AI for powerful image generation
- React and Vite teams for excellent developer experience
- MongoDB for reliable database solutions
- The open-source community

---
