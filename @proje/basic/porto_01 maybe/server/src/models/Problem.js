const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: String,
  constraints: String,
  examples: [
    {
      input: String,
      output: String,
      explanation: String
    }
  ],
  testCases: [
    {
      input: {
        type: mongoose.Schema.Types.Mixed,
        required: true
      },
      output: {
        type: mongoose.Schema.Types.Mixed,
        required: true
      },
      isHidden: {
        type: Boolean,
        default: false
      }
    }
  ],
  hints: [String],
  solutionCode: {
    type: String,
    required: true
  },
  timeComplexity: String,
  spaceComplexity: String,
  companies: [String],
  tags: [String],
  solutionExplanation: String,
  successRate: {
    type: Number,
    default: 0
  },
  totalAttempts: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for searching
ProblemSchema.index({ title: 'text', description: 'text', category: 'text', tags: 'text' });

module.exports = mongoose.model('Problem', ProblemSchema); 