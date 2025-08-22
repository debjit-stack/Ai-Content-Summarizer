import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  originalContent: {
    type: String,
    required: true,
    maxlength: 50000
  },
  summary: {
    type: String,
    required: true,
    maxlength: 5000
  },
  summaryLength: {
    type: String,
    enum: ['short', 'medium', 'long'],
    default: 'medium'
  },
  contentType: {
    type: String,
    enum: ['text', 'url', 'file'],
    default: 'text'
  },
  sourceUrl: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  wordCount: {
    original: { type: Number, default: 0 },
    summary: { type: Number, default: 0 }
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

// Update the updatedAt field before saving
summarySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate word counts before saving
summarySchema.pre('save', function(next) {
  this.wordCount.original = this.originalContent.split(/\s+/).length;
  this.wordCount.summary = this.summary.split(/\s+/).length;
  next();
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;