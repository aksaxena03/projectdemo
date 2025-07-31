# Final Round AI

An AI-powered technical interview preparation platform that simulates real technical interviews, provides real-time feedback, and helps you prepare for coding interviews.

## Features

- **AI-Powered Mock Interviews**: Practice with realistic interview simulations
- **Technical Coding Challenges**: Solve coding problems with real-time feedback
- **System Design Interviews**: Practice explaining architectural decisions
- **Behavioral Question Practice**: Improve your communication and soft skills
- **Personalized Feedback**: Get detailed feedback on your performance
- **Performance Analytics**: Track your progress over time

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Monaco Editor (Code Editor)

### Backend
- Node.js
- Express
- OpenAI API for AI-powered feedback

## Getting Started

### Prerequisites
- Node.js and npm

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/final-round-ai.git
cd final-round-ai
```

2. Install server dependencies
```
cd server
npm install
```

3. Create a `.env` file in the server directory:
```
PORT=5000
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

4. Install client dependencies
```
cd ../client
npm install
```

### Running the Application

1. Start the server
```
cd server
npm run dev
```

2. In a new terminal, start the client
```
cd client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
final-round-ai/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   ├── src/               
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   └── App.jsx         # Main application component
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── package.json        # Frontend dependencies
├── server/                 # Backend Node.js/Express server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   └── index.js        # Server entry point
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## Usage Instructions

1. **Registration/Login**: Start by creating an account or logging in
2. **Create Interview**: From the dashboard, create a new mock interview
3. **Take Interview**: Start the interview and answer the technical/behavioral questions
4. **Code Solutions**: Use the embedded code editor for coding problems
5. **Get Feedback**: Receive AI-generated feedback on your performance
6. **Track Progress**: Monitor your improvement over time

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Interviews
- `GET /api/interviews` - Get all interviews
- `GET /api/interviews/:id` - Get interview by ID
- `POST /api/interviews` - Create a new interview
- `POST /api/interviews/:id/start` - Start an interview
- `POST /api/interviews/:id/end` - End an interview
- `POST /api/interviews/generate-question` - Generate a new question

### Feedback
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/interview/:interviewId` - Get feedback by interview ID
- `POST /api/feedback` - Create feedback for an interview
- `POST /api/feedback/quick-feedback` - Generate quick feedback on an answer

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 