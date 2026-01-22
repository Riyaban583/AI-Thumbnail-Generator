<p align="center">
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</p>

<h1 align="center">🎨 THUMBLIFY</h1>
<h3 align="center">AI-Powered Thumbnail Generator</h3>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Gemini_AI-Powered-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI">
</p>

<p align="center">
  THUMBLIFY is a full-stack AI-powered thumbnail generator designed for <strong>YouTubers, content creators, and digital marketers</strong>. Create stunning, professional thumbnails in seconds using the power of Gemini AI.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧠 **AI Generation** | Powered by Google's Gemini AI for high-quality thumbnail creation |
| ✍️ **Prompt-Based** | Simply describe what you want and let AI do the magic |
| 🎨 **Style Control** | Choose from multiple artistic styles and color schemes |
| 📐 **Aspect Ratios** | Support for YouTube (16:9), Instagram (1:1), and custom ratios |
| 👁️ **Live Preview** | Real-time preview before downloading |
| ⬇️ **Quick Download** | Download thumbnails in high resolution (PNG/JPG) |
| 🔐 **Authentication** | Secure user login and signup with JWT |
| 📂 **Image Upload** | Upload and enhance your own images |
| ⚡ **Modern UI** | Sleek, responsive interface built with React + TypeScript |
| 💬 **AI Chatbot** | Floating chatbot assistant on homepage for instant help and guidance |
| 🌙 **Dark Mode** | Eye-friendly dark theme (optional) |

---


## 🛠️ Tech Stack

### **Frontend**
- **React.js** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Context API** - State management
- **CSS/Tailwind** - Styling

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload handling
- **JWT** - Authentication

### **AI & APIs**
- **Google Gemini AI** - Thumbnail generation
- **Cloudinary** (optional) - Image storage

---

## 📂 Project Structure

```
THUMBLIFY/
│
├── client/                    # Frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/          # Images, icons, fonts
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Chatbot/    # AI chatbot component
│   │   │   ├── Header/     # Navigation header
│   │   │   ├── Footer/     # Page footer
│   │   │   └── ...         # Other components
│   │   ├── configs/         # Configuration files
│   │   ├── context/         # React Context providers
│   │   ├── data/            # Static data & constants
│   │   ├── pages/           # Page components
│   │   ├── sections/        # Page sections
│   │   ├── global.css       # Global styles
│   │   ├── main.tsx         # Application entry point
│   │   └── types.ts         # TypeScript type definitions
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                    # Backend application
│   ├── configs/              # Configuration files
│   │   └── database.ts      # MongoDB connection
│   ├── controllers/          # Route controllers
│   │   ├── auth.controller.ts
│   │   └── thumbnail.controller.ts
│   ├── middlewares/          # Express middlewares
│   │   ├── auth.middleware.ts
│   │   └── upload.middleware.ts
│   ├── models/               # Mongoose models
│   │   ├── User.model.ts
│   │   └── Thumbnail.model.ts
│   ├── routes/               # API routes
│   │   ├── auth.routes.ts
│   │   └── thumbnail.routes.ts
│   ├── uploads/              # Uploaded files (gitignored)
│   ├── server.ts             # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Gemini API Key** from [Google AI Studio](https://ai.google.dev/)
## 📖 Usage

### Quick Start Guide

1. **Sign Up / Login**
   - Create a new account or login with existing credentials

2. **Use AI Chatbot (Homepage)**
   - Click on the floating chatbot icon at the bottom-right corner
   - Ask questions about features, get guidance, or troubleshoot issues
   - Available 24/7 for instant support

3. **Generate Thumbnail**
   - Navigate to the generation page
   - Enter a descriptive prompt (e.g., "Epic gaming thumbnail with neon effects")
   - Select style, color scheme, and aspect ratio
   - Click "Generate"

4. **Preview & Download**
   - View the generated thumbnail
   - Make adjustments if needed
   - Download in your preferred format

### API Endpoints

<details>
<summary>View API Documentation</summary>

#### Authentication
```http
POST /api/auth/register    # Register new user
POST /api/auth/login       # Login user
GET  /api/auth/me          # Get current user (requires auth)
```

#### Thumbnails
```http
POST /api/thumbnails/generate       # Generate thumbnail (requires auth)
GET  /api/thumbnails/user/:userId   # Get user's thumbnails
GET  /api/thumbnails/:id            # Get specific thumbnail
DELETE /api/thumbnails/:id          # Delete thumbnail
```

#### Chatbot
```http
POST /api/chatbot/message           # Send message to AI chatbot
GET  /api/chatbot/history           # Get chat history (requires auth)
```

</details>

---

## 🎯 Use Cases

- **YouTube Content Creators** - Generate eye-catching video thumbnails
- **Social Media Marketers** - Create engaging post graphics
- **Digital Agencies** - Quick mockups for client presentations
- **Bloggers** - Featured images for blog posts
- **Course Creators** - Professional course thumbnails
- **First-time Users** - Get instant help via the AI chatbot assistant

---

## 🔐 Security

- ✅ Environment variables for sensitive data
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Rate limiting on API endpoints
- ✅ `.gitignore` for sensitive files

---

## 📝 Future Enhancements

- [ ] Batch thumbnail generation
- [ ] Template library
- [ ] Advanced editing tools
- [ ] Social media scheduling integration
- [ ] A/B testing for thumbnails
- [ ] Analytics dashboard
- [ ] Collaborative workspaces

---


## 🙏 Acknowledgments

- Google Gemini AI for powerful image generation
- React and TypeScript communities
- All contributors and supporters

---


<p align="center">
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</p>

<p align="center">Made with ❤️ by Riya Bansal</p>
