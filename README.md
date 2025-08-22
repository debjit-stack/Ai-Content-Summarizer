# AI Content Summarizer

> An intelligent web application that transforms long-form text into concise, well-structured summaries using the power of Google's Gemini AI.

This full-stack project features a modern, responsive frontend built with React and a robust, scalable backend powered by Node.js and Express.

## 🌐 Live Demo

- **Frontend**: [concise-content.vercel.app](https://concise-content.vercel.app)
- **Backend API**: [https://ai-content-summarizer-m2l0.onrender.com](https://ai-content-summarizer-m2l0.onrender.com)

## ✨ Key Features

- **🤖 AI-Powered Summarization**: Utilizes Google Gemini API to generate high-quality summaries with customizable lengths (short, medium, long)
- **📚 Persistent History**: Automatically saves every generated summary to MongoDB for future reference
- **🎨 Interactive UI**: Sleek, modern interface built with React and Tailwind CSS featuring a fixed sidebar for seamless navigation
- **🌓 Theme Support**: Toggle between dark and light modes with CSS variable-based styling
- **🔍 Advanced History Management**: Search, filter, and delete past summaries with ease
- **⚡ Scalable Architecture**: Built with Controller-Service-Route pattern for maintainability and future expansion
- **📱 Responsive Design**: Fully responsive across all device sizes

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **API**: RESTful Architecture

### AI & External Services
- **AI Model**: Google Gemini (`gemini-1.5-flash-latest`)
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 📋 Prerequisites

Before running this project locally, ensure you have:

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **MongoDB Atlas** account and connection string
- **Google AI Studio** API key

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-content-summarizer.git
cd ai-content-summarizer
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `server` directory:

```env
# Database
MONGO_URI=your_mongodb_atlas_connection_string

# AI API
GEMINI_API_KEY=your_gemini_api_key

# Server Configuration
PORT=5000
NODE_ENV=development
```

Start the development server:

```bash
npm run dev
```

The backend will be running at `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will open in your browser at `http://localhost:5173`

## 📁 Project Structure

```
ai-content-summarizer/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store configuration
│   │   ├── services/       # API service functions
│   │   └── styles/         # Global styles
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── services/           # Business logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── package.json
└── README.md
```

## 🚢 Deployment

This application is deployed using a modern, scalable architecture:

### Backend (Render)
The backend is deployed as a Web Service on Render with:
- Automatic builds from GitHub
- Environment variable management
- MongoDB Atlas integration

### Frontend (Vercel)
The frontend is deployed as a static site on Vercel with:
- Automatic deployments from GitHub
- Environment variable configuration
- CDN optimization

## 📚 API Documentation

### Base URL
- **Local**: `http://localhost:5000/api`
- **Production**: `https://ai-content-summarizer-9eqz.onrender.com/api`

### Endpoints

#### Generate Summary
```http
POST /api/summarize
Content-Type: application/json

{
  "text": "Your long-form text here...",
  "length": "medium" // "short" | "medium" | "long"
}
```

#### Get Summary History
```http
GET /api/history
```

#### Delete Summary
```http
DELETE /api/history/:id
```

## 🎨 Features in Detail

### AI Summarization
- Leverages Google's Gemini 1.5 Flash model for fast, accurate summaries
- Three customizable summary lengths to suit different needs
- Intelligent text processing with context preservation

### History Management
- Automatic saving of all generated summaries
- Search functionality across summary titles and content
- Date-based filtering and sorting
- One-click deletion of unwanted summaries

### User Experience
- Dark/Light theme toggle with system preference detection
- Responsive design optimized for mobile and desktop
- Loading states and error handling throughout the application
- Intuitive navigation with fixed sidebar

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Google AI for providing the Gemini API
- MongoDB for database hosting
- Vercel and Render for deployment platforms
- The open-source community for the amazing tools and libraries
