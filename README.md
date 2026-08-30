# Intelligent Email Assistant

A production-ready, AI-powered email client with Gmail integration, built with modern web technologies and serverless architecture patterns.

## ✨ Features

- **Gmail Integration** - OAuth 2.0 secure authentication with Gmail API
- **AI-Powered Summarization** - Automatically generate executive summaries of email threads
- **Smart Draft Generation** - Compose responses in multiple tones (Professional, Concise, Casual, Persuasive)
- **Email Categorization** - Intelligent labeling (Action Required, Finance, Social & Updates, Urgent Alerts)
- **Real-time Updates** - WebSocket support for live inbox updates
- **Demo Mode** - Explore with pre-loaded mock data
- **Responsive UI** - Works seamlessly on desktop and mobile

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework:** Next.js 15 + React 19
- **Styling:** Tailwind CSS
- **Icons:** Lucide Icons
- **State Management:** Zustand
- **HTTP Client:** Axios with JWT interceptors

### Backend (Node.js)
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB (with in-memory fallback for local dev)
- **Authentication:** JWT + bcryptjs
- **Real-time:** Socket.IO
- **Queue:** Bull (with in-memory fallback)

### Deployment
- **Frontend:** Vercel (Next.js optimized)
- **Backend:** Render
- **Database:** MongoDB Atlas (production)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (optional - uses in-memory for local dev)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/padmadivya58-beep/-Intelligent-Email-Assistant.git
   cd email-assistant
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set environment variables**
   ```bash
   # Backend (.env)
   cp .env.example .env
   # Edit .env with your values
   
   # Frontend (.env.local)
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   ```

4. **Start the backend**
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:5001
   ```

5. **Start the frontend (new terminal)**
   ```bash
   cd frontend
   npm run dev
   # App runs on http://localhost:3000
   ```

6. **Open the app**
   - Navigate to http://localhost:3000
   - Click "Enter Workspace with Demo Data" to explore with mock emails

## 📝 Environment Variables

### Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=5001
CLIENT_URL=http://localhost:3000
MONGO_URI=mongodb://127.0.0.1:27017/intelligent-email-assistant
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRES_IN=7d
CREDENTIAL_ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5001/api/integrations/oauth/google/callback
GEMINI_API_KEY=your-gemini-api-key (optional)
OPENROUTER_API_KEY=your-openrouter-api-key (optional)
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## 🔑 Default Credentials (Demo Mode)

Use these credentials to test the app locally:
- **Email:** `demo@example.com`
- **Password:** `demo123`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Email
- `GET /api/mail/inbox` - Get inbox emails
- `GET /api/mail/thread/:id` - Get email thread
- `POST /api/mail/mark-read` - Mark emails as read

### AI
- `POST /api/ai/summarize` - Summarize email content
- `POST /api/ai/reply` - Generate reply with specified tone

### Health
- `GET /api/health` - Health check endpoint

## 🧪 Testing

### Run backend tests
```bash
cd backend
npm test
```

### Run frontend tests
```bash
cd frontend
npm test
```

## 📦 Production Build

### Build frontend
```bash
cd frontend
npm run build
npm run start
```

### Build backend
```bash
cd backend
npm run build
npm start
```

## 🌐 Deployment

### Deploy to Render (Backend)

1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect this GitHub repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables (same as `.env`)
6. Deploy

### Deploy to Vercel (Frontend)

1. Go to [vercel.com](https://vercel.com)
2. Import this GitHub repository
3. Configure:
   - **Root Directory:** `frontend`
   - **Framework:** Next.js
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com
   ```
5. Deploy

## 📋 Project Structure

```
email-assistant/
├── backend/
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utilities
│   │   └── server.js      # Entry point
│   ├── tests/             # Test files
│   ├── .env               # Environment variables
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── pages/             # Next.js pages
│   ├── components/        # React components
│   ├── lib/               # Utilities
│   ├── store/             # Zustand stores
│   ├── styles/            # Global styles
│   ├── .env.local         # Local env vars
│   ├── package.json
│   ├── next.config.js
│   └── README.md
└── README.md
```

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT tokens with expiration
- API keys stored in environment variables
- CORS configured for frontend domain
- Credential encryption for third-party integrations
- Input validation on all endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Port 5001 already in use
```bash
# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5001
kill -9 <PID>
```

### MongoDB connection fails
The app automatically falls back to in-memory storage for local development. For production, configure MongoDB Atlas in `.env`.

### AI features not working
- Ensure `GEMINI_API_KEY` is set in backend `.env`
- Or `OPENROUTER_API_KEY` for alternative provider
- Without these, the app uses deterministic mock responses

### Frontend can't reach backend
- Check `NEXT_PUBLIC_API_URL` is correct in `frontend/.env.local`
- Verify backend is running on the specified port
- Check CORS configuration in backend `server.js`

## 📞 Support

For issues or questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Include environment details and error messages

## 🗺️ Roadmap

- [ ] Full Gmail API v2.0 integration
- [ ] Gemini AI integration for summarization
- [ ] Email attachments support
- [ ] Advanced search filters
- [ ] Email templates
- [ ] Mobile app (React Native)
- [ ] Dark mode

---

**Made with ❤️ for modern email productivity**
