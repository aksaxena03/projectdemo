const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

// Initialize OpenAI (in production, use API key from environment variables)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key',
});

// Mock database for interviews
const interviews = [];

// Get all interviews
router.get('/', (req, res) => {
  res.json(interviews);
});

// Get interview by id
router.get('/:id', (req, res) => {
  const interview = interviews.find(i => i.id.toString() === req.params.id);
  if (!interview) {
    return res.status(404).json({ message: 'Interview not found' });
  }
  res.json(interview);
});

// Create new interview
router.post('/', (req, res) => {
  const { title, type, difficulty, technologies } = req.body;
  const newInterview = {
    id: interviews.length + 1,
    title,
    type,
    difficulty,
    technologies,
    questions: [],
    createdAt: new Date(),
    status: 'scheduled'
  };
  
  interviews.push(newInterview);
  res.status(201).json(newInterview);
});

// Start interview
router.post('/:id/start', (req, res) => {
  const interview = interviews.find(i => i.id.toString() === req.params.id);
  if (!interview) {
    return res.status(404).json({ message: 'Interview not found' });
  }
  
  interview.status = 'in-progress';
  interview.startedAt = new Date();
  
  res.json(interview);
});

// End interview
router.post('/:id/end', (req, res) => {
  const interview = interviews.find(i => i.id.toString() === req.params.id);
  if (!interview) {
    return res.status(404).json({ message: 'Interview not found' });
  }
  
  interview.status = 'completed';
  interview.endedAt = new Date();
  
  res.json(interview);
});

// Generate interview question using AI
router.post('/generate-question', async (req, res) => {
  try {
    const { technologies, difficulty, type } = req.body;
    
    const prompt = `Generate a ${difficulty} level ${type} interview question about ${technologies.join(', ')}. 
                   Include the question, hints, and a detailed solution.`;
    
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert technical interviewer for software engineering positions." },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
    });
    
    const question = completion.choices[0].message.content;
    
    res.json({
      question,
      technologies,
      difficulty,
      type,
      createdAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating question', error: error.message });
  }
});

// Submit solution for an interview question
router.post('/:id/questions/:questionId/solution', async (req, res) => {
  try {
    const { solution } = req.body;
    const interview = interviews.find(i => i.id.toString() === req.params.id);
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    // For demo purposes we're using AI to evaluate the solution
    // In a real system, you might have test cases or more sophisticated evaluation
    const prompt = `Evaluate this solution for a coding problem:
                   ${solution}
                   
                   Provide feedback on:
                   1. Correctness
                   2. Time complexity
                   3. Space complexity
                   4. Code style and readability
                   5. Potential improvements`;
                   
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert software engineer who evaluates code." },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
    });
    
    const feedback = completion.choices[0].message.content;
    
    res.json({
      solution,
      feedback,
      submittedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error evaluating solution', error: error.message });
  }
});

module.exports = router; 