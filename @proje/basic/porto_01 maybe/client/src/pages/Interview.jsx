import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import MonacoEditor from 'react-monaco-editor';

// eslint-disable-next-line no-unused-vars
const API_URL = 'http://localhost:5000/api';

// Mock questions for the interview
const mockQuestions = [
  {
    id: 1,
    question: "What is the difference between let, const, and var in JavaScript?",
    type: "Conceptual",
    difficulty: "Intermediate"
  },
  {
    id: 2,
    question: "Implement a function to reverse a linked list.",
    type: "Coding",
    difficulty: "Intermediate",
    codeSnippet: `
function reverseLinkedList(head) {
  // Your code here
}`
  },
  {
    id: 3,
    question: "Explain the concept of closures in JavaScript with an example.",
    type: "Conceptual",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    question: "Implement a function that checks if a string is a palindrome.",
    type: "Coding",
    difficulty: "Beginner",
    codeSnippet: `
function isPalindrome(str) {
  // Your code here
}`
  }
];

const Interview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useState(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [code, setCode] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  
  // In a real app, we would fetch interview and questions from API
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        // Mock data
        setInterview({
          id: parseInt(id),
          title: 'Front-end Developer Interview',
          type: 'Technical',
          difficulty: 'Intermediate',
          technologies: ['React', 'JavaScript', 'CSS'],
          status: 'in-progress',
          startedAt: new Date()
        });
        
        // Initialize answers object
        const initialAnswers = {};
        const initialCode = {};
        mockQuestions.forEach(q => {
          initialAnswers[q.id] = '';
          if (q.type === 'Coding') {
            initialCode[q.id] = q.codeSnippet;
          }
        });
        
        setAnswers(initialAnswers);
        setCode(initialCode);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching interview:', error);
        setIsLoading(false);
      }
    };
    
    fetchInterview();
  }, [id]);
  
  const handleAnswerChange = (e) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers({
      ...answers,
      [currentQuestion.id]: e.target.value
    });
  };
  
  const handleCodeChange = (newValue) => {
    const currentQuestion = questions[currentQuestionIndex];
    setCode({
      ...code,
      [currentQuestion.id]: newValue
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, we would post to the API
      // Submit the answers and get feedback
      
      // Mock feedback
      const mockFeedback = {
        overallScore: 8.2,
        technicalScore: 7.9,
        communicationScore: 8.5,
        feedbackText: `
        Overall, you demonstrated a good understanding of core JavaScript concepts and problem-solving skills.
        
        Strengths:
        - Strong grasp of JavaScript closures and variable declaration
        - Good problem-solving approach for palindrome detection
        - Clear communication of your thought process
        
        Areas for improvement:
        - The linked list reversal could be optimized
        - Consider edge cases more thoroughly in your solutions
        - Work on time efficiency in coding problems
        
        Keep practicing, and you'll be well-prepared for real technical interviews!
        `
      };
      
      setFeedback(mockFeedback);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error submitting interview:', error);
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (feedback) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Interview Feedback</h1>
          
          <div className="flex justify-between mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-lg font-medium">Overall Score</p>
              <p className="text-3xl font-bold text-blue-600">{feedback.overallScore}/10</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-medium">Technical</p>
              <p className="text-3xl font-bold text-green-600">{feedback.technicalScore}/10</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-lg font-medium">Communication</p>
              <p className="text-3xl font-bold text-purple-600">{feedback.communicationScore}/10</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Detailed Feedback</h2>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line">
              {feedback.feedbackText}
            </div>
          </div>
          
          <div className="mt-8">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{interview?.title}</h1>
          <div className="flex space-x-2">
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold">
              {interview?.type}
            </span>
            <span className="px-2 py-1 rounded bg-purple-100 text-purple-800 text-xs font-semibold">
              {interview?.difficulty}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">
              {currentQuestion.type}
            </span>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="font-medium">{currentQuestion.question}</p>
          </div>
        </div>
        
        <div className="mb-6">
          {currentQuestion.type === 'Coding' ? (
            <div className="border border-gray-300 rounded">
              <div style={{ height: '400px' }}>
                <MonacoEditor
                  language="javascript"
                  theme="vs-light"
                  value={code[currentQuestion.id]}
                  onChange={handleCodeChange}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14
                  }}
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 mb-2">Your Answer:</label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 h-60"
                value={answers[currentQuestion.id]}
                onChange={handleAnswerChange}
                placeholder="Type your answer here..."
              ></textarea>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <div>
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevQuestion}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
              >
                Previous
              </button>
            )}
            
            {currentQuestionIndex < questions.length - 1 && (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
          </div>
          
          {currentQuestionIndex === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Submit Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview; 