import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const API_URL = 'http://localhost:5000/api';

// Mock interview data
const mockInterviews = [
  {
    id: 1,
    title: 'Front-end Developer Interview',
    type: 'Technical',
    difficulty: 'Intermediate',
    technologies: ['React', 'JavaScript', 'CSS'],
    status: 'scheduled',
    createdAt: new Date('2023-09-15')
  },
  {
    id: 2,
    title: 'Full Stack Developer Interview',
    type: 'Technical',
    difficulty: 'Advanced',
    technologies: ['Node.js', 'React', 'MongoDB'],
    status: 'completed',
    createdAt: new Date('2023-09-10'),
    feedback: 'Overall good performance. Strong in React but needs improvement in database design.'
  },
  {
    id: 3,
    title: 'System Design Interview',
    type: 'System Design',
    difficulty: 'Advanced',
    technologies: ['Microservices', 'AWS', 'Distributed Systems'],
    status: 'scheduled',
    createdAt: new Date('2023-09-20')
  }
];

const Dashboard = () => {
  const [interviews, setInterviews] = useState(mockInterviews);
  const [isCreating, setIsCreating] = useState(false);
  const [newInterview, setNewInterview] = useState({
    title: '',
    type: 'Technical',
    difficulty: 'Intermediate',
    technologies: []
  });
  
  // In a real app, we would fetch from the API
  // useEffect(() => {
  //   const fetchInterviews = async () => {
  //     const response = await axios.get(`${API_URL}/interviews`);
  //     setInterviews(response.data);
  //   };
  //   fetchInterviews();
  // }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInterview({
      ...newInterview,
      [name]: value
    });
  };
  
  const handleTechChange = (e) => {
    const techs = e.target.value.split(',').map(t => t.trim());
    setNewInterview({
      ...newInterview,
      technologies: techs
    });
  };
  
  const handleCreateInterview = async () => {
    try {
      // In a real app, we would post to the API
      // const response = await axios.post(`${API_URL}/interviews`, newInterview);
      // const createdInterview = response.data;
      
      // Mock creation
      const createdInterview = {
        ...newInterview,
        id: interviews.length + 1,
        status: 'scheduled',
        createdAt: new Date()
      };
      
      setInterviews([...interviews, createdInterview]);
      setIsCreating(false);
      setNewInterview({
        title: '',
        type: 'Technical',
        difficulty: 'Intermediate',
        technologies: []
      });
      
    } catch (error) {
      console.error('Error creating interview:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Interview Dashboard</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => setIsCreating(!isCreating)}
        >
          {isCreating ? 'Cancel' : 'Create New Interview'}
        </button>
      </div>
      
      {isCreating && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Interview</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Interview Title</label>
              <input
                type="text"
                name="title"
                value={newInterview.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="e.g., Frontend Developer Interview"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Interview Type</label>
              <select
                name="type"
                value={newInterview.type}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Technical">Technical Coding</option>
                <option value="System Design">System Design</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Mixed">Mixed Format</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Difficulty Level</label>
              <select
                name="difficulty"
                value={newInterview.difficulty}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Technologies (comma separated)</label>
              <input
                type="text"
                name="technologies"
                value={newInterview.technologies.join(', ')}
                onChange={handleTechChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>
            
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleCreateInterview}
            >
              Create Interview
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map(interview => (
          <div key={interview.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{interview.title}</h2>
              <div className="flex space-x-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  interview.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {interview.status === 'completed' ? 'Completed' : 'Scheduled'}
                </span>
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-800 text-xs font-semibold">
                  {interview.difficulty}
                </span>
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs font-semibold">
                  {interview.type}
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 text-sm">Technologies:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {interview.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-gray-200 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Link
                  to={`/interview/${interview.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  {interview.status === 'completed' ? 'View Details' : 'Start Interview'}
                </Link>
                
                {interview.status === 'completed' && (
                  <Link
                    to={`/feedback/${interview.id}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    View Feedback
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 