const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

// Initialize OpenAI (in production, use API key from environment variables)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key',
});

// Mock database for feedback
const feedback = [];

// Get all feedback
router.get('/', (req, res) => {
  res.json(feedback);
});

// Get feedback by interview id
router.get('/interview/:interviewId', (req, res) => {
  const interviewFeedback = feedback.filter(f => f.interviewId.toString() === req.params.interviewId);
  res.json(interviewFeedback);
});

// Create new feedback for an interview
router.post('/', async (req, res) => {
  try {
    const { interviewId, answers, code, behaviouralNotes } = req.body;
    
    // Generate AI feedback
    const promptText = `
    Interview Performance Analysis:
    
    Technical Questions and Answers:
    ${JSON.stringify(answers)}
    
    Code Sample:
    ${code || 'No code provided'}
    
    Behavioral Notes:
    ${behaviouralNotes || 'No behavioral notes provided'}
    
    Please provide detailed feedback on this interview performance covering:
    1. Technical knowledge assessment
    2. Coding skills evaluation
    3. Problem-solving approach
    4. Communication skills
    5. Areas for improvement
    6. Overall rating (out of 10)
    `;
    
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert technical interviewer providing detailed feedback on candidate performance." },
        { role: "user", content: promptText }
      ],
      model: "gpt-3.5-turbo",
    });
    
    const aiGeneratedFeedback = completion.choices[0].message.content;
    
    // Save feedback
    const newFeedback = {
      id: feedback.length + 1,
      interviewId,
      aiGeneratedFeedback,
      rawAnswers: answers,
      code,
      behaviouralNotes,
      createdAt: new Date()
    };
    
    feedback.push(newFeedback);
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error generating feedback', error: error.message });
  }
});

// Generate quick feedback on a specific answer
router.post('/quick-feedback', async (req, res) => {
  try {
    const { question, answer, codeSnippet } = req.body;
    
    const prompt = `
    Question: ${question}
    
    Answer: ${answer}
    
    ${codeSnippet ? `Code Snippet: ${codeSnippet}` : ''}
    
    Provide quick feedback on this answer including:
    1. Correctness
    2. Clarity
    3. Completeness
    4. Suggestions for improvement
    `;
    
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert technical interviewer providing immediate feedback on interview answers." },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
    });
    
    const quickFeedback = completion.choices[0].message.content;
    
    res.json({
      question,
      answer,
      codeSnippet,
      feedback: quickFeedback,
      createdAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating quick feedback', error: error.message });
  }
});

module.exports = router; 