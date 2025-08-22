import { GoogleGenerativeAI } from '@google/generative-ai';
import Summary from './summary.model.js';
import 'dotenv/config';

// Initialize the Google AI client once at the module level
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class SummaryService {
  // The constructor is no longer needed

  async generateSummary(content, options = {}) {
    const { length = 'medium' } = options;
    
    const prompts = {
      short: `Provide a concise summary in 2-3 sentences of the following content:\n\n${content}`,
      medium: `Provide a comprehensive summary in 1-2 paragraphs of the following content, highlighting the main points and key insights:\n\n${content}`,
      long: `Provide a detailed summary in 3-4 paragraphs of the following content, including main points, supporting details, and key takeaways:\n\n${content}`
    };

    try {
      // Use the official, stable library to interact with the API
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const prompt = prompts[length] || prompts.medium;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      if (response.text()) {
        return response.text();
      } else {
        throw new Error('Invalid response from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate summary via Gemini API');
    }
  }

  // --- ALL YOUR OTHER METHODS ARE PERFECT AND REMAIN UNCHANGED ---

  async createSummary(data) {
    const { title, content, length = 'medium', contentType = 'text', sourceUrl, tags } = data;
    
    try {
      // This correctly calls your new generateSummary method above
      const summaryText = await this.generateSummary(content, { length });
      
      const summary = new Summary({
        title,
        originalContent: content,
        summary: summaryText,
        summaryLength: length,
        contentType,
        sourceUrl,
        tags: tags || []
      });

      const savedSummary = await summary.save();
      return savedSummary;
    } catch (error) {
      // The error from generateSummary will be caught here
      throw new Error(`Failed to create summary: ${error.message}`);
    }
  }

  async getAllSummaries(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const summaries = await Summary.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-originalContent');

      const total = await Summary.countDocuments();
      
      return {
        summaries,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch summaries: ${error.message}`);
    }
  }

  async getSummaryById(id) {
    try {
      const summary = await Summary.findById(id);
      if (!summary) {
        throw new Error('Summary not found');
      }
      return summary;
    } catch (error) {
      throw new Error(`Failed to fetch summary: ${error.message}`);
    }
  }

  async deleteSummary(id) {
    try {
      const summary = await Summary.findByIdAndDelete(id);
      if (!summary) {
        throw new Error('Summary not found');
      }
      return { message: 'Summary deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete summary: ${error.message}`);
    }
  }

  async searchSummaries(query, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const searchRegex = new RegExp(query, 'i');
      
      const summaries = await Summary.find({
        $or: [
          { title: searchRegex },
          { summary: searchRegex },
          { tags: { $in: [searchRegex] } }
        ]
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-originalContent');

      const total = await Summary.countDocuments({
        $or: [
          { title: searchRegex },
          { summary: searchRegex },
          { tags: { $in: [searchRegex] } }
        ]
      });

      return {
        summaries,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Failed to search summaries: ${error.message}`);
    }
  }
}

export default SummaryService;