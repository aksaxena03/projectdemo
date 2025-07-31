import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const API_URL = 'http://localhost:5000/api';

const Feedback = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [interview, setInterview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // In a real app, we would fetch the feedback and interview from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data
        const mockInterview = {
          id: parseInt(id),
          title: 'Full Stack Developer Interview',
          type: 'Technical',
          difficulty: 'Advanced',
          technologies: ['Node.js', 'React', 'MongoDB'],
          status: 'completed',
          createdAt: new Date('2023-09-10'),
          completedAt: new Date('2023-09-10'),
        };
        
        // Mock feedback
        const mockFeedback = {
          id: 1,
          interviewId: parseInt(id),
          overallScore: 8.2,
          technicalScore: 7.9,
          communicationScore: 8.5,
          problemSolvingScore: 8.1,
          feedbackText: `
          Overall, you demonstrated a good understanding of full stack development concepts and problem-solving skills.
          
          Strengths:
          - Strong knowledge of React component lifecycle and hooks
          - Good understanding of RESTful API design
          - Clear explanation of database design concepts
          
          Areas for improvement:
          - Consider more edge cases in your solutions
          - Work on optimizing MongoDB queries
          - Could improve knowledge of security best practices
          
          Specific feedback on technical questions:
          1. Your explanation of React hooks was accurate but could be more concise
          2. The database schema design was well thought out but consider normalization
          3. Your API design followed RESTful principles well
          
          Keep practicing, and you'll be well-prepared for real technical interviews!
          `,
          createdAt: new Date('2023-09-10')
        };
        
        setInterview(mockInterview);
        setFeedback(mockFeedback);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Failed to load feedback. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <div className="mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold mb-2">{interview?.title} - Feedback</h1>
          <div className="flex space-x-2 mb-4">
            <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">
              Completed
            </span>
            <span className="px-2 py-1 rounded bg-purple-100 text-purple-800 text-xs font-semibold">
              {interview?.difficulty}
            </span>
            <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs font-semibold">
              {interview?.type}
            </span>
          </div>
          
          <div className="mb-2">
            <p className="text-gray-600 text-sm">Technologies:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {interview?.technologies.map(tech => (
                <span key={tech} className="px-2 py-1 bg-gray-200 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-lg font-medium">Overall Score</p>
            <p className="text-3xl font-bold text-blue-600">{feedback?.overallScore}/10</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-lg font-medium">Technical</p>
            <p className="text-3xl font-bold text-green-600">{feedback?.technicalScore}/10</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-lg font-medium">Communication</p>
            <p className="text-3xl font-bold text-purple-600">{feedback?.communicationScore}/10</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-lg font-medium">Problem Solving</p>
            <p className="text-3xl font-bold text-yellow-600">{feedback?.problemSolvingScore}/10</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Detailed Feedback</h2>
          <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-line">
            {feedback?.feedbackText}
          </div>
        </div>
        
        <div className="mt-8 flex space-x-4">
          <Link 
            to={`/interview/${id}`}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            View Interview Details
          </Link>
          <Link 
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feedback; 