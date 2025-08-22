import SummaryService from './summary.service.js';
import validator from 'validator';

const summaryService = new SummaryService();

class SummaryController {
  async createSummary(req, res) {
    try {
      const { title, content, length, contentType, sourceUrl, tags } = req.body;

      // Validation
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          message: 'Title and content are required'
        });
      }

      if (title.length > 200) {
        return res.status(400).json({
          success: false,
          message: 'Title must be less than 200 characters'
        });
      }

      if (content.length > 50000) {
        return res.status(400).json({
          success: false,
          message: 'Content must be less than 50,000 characters'
        });
      }

      if (sourceUrl && !validator.isURL(sourceUrl)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid source URL format'
        });
      }

      const validLengths = ['short', 'medium', 'long'];
      if (length && !validLengths.includes(length)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid summary length. Must be short, medium, or long'
        });
      }

      const summary = await summaryService.createSummary({
        title: validator.escape(title.trim()),
        content: content.trim(),
        length: length || 'medium',
        contentType: contentType || 'text',
        sourceUrl: sourceUrl || null,
        tags: tags || []
      });

      res.status(201).json({
        success: true,
        data: summary,
        message: 'Summary created successfully'
      });
    } catch (error) {
      console.error('Create summary error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create summary'
      });
    }
  }

  async getAllSummaries(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      if (page < 1 || limit < 1 || limit > 50) {
        return res.status(400).json({
          success: false,
          message: 'Invalid pagination parameters'
        });
      }

      const result = await summaryService.getAllSummaries(page, limit);

      res.json({
        success: true,
        data: result.summaries,
        pagination: result.pagination,
        message: 'Summaries fetched successfully'
      });
    } catch (error) {
      console.error('Get summaries error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch summaries'
      });
    }
  }

  async getSummaryById(req, res) {
    try {
      const { id } = req.params;

      if (!validator.isMongoId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid summary ID format'
        });
      }

      const summary = await summaryService.getSummaryById(id);

      res.json({
        success: true,
        data: summary,
        message: 'Summary fetched successfully'
      });
    } catch (error) {
      console.error('Get summary error:', error);
      const statusCode = error.message === 'Summary not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to fetch summary'
      });
    }
  }

  async deleteSummary(req, res) {
    try {
      const { id } = req.params;

      if (!validator.isMongoId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid summary ID format'
        });
      }

      const result = await summaryService.deleteSummary(id);

      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      console.error('Delete summary error:', error);
      const statusCode = error.message === 'Summary not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to delete summary'
      });
    }
  }

  async searchSummaries(req, res) {
    try {
      const { q: query } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      if (!query || query.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      if (query.length > 100) {
        return res.status(400).json({
          success: false,
          message: 'Search query must be less than 100 characters'
        });
      }

      const result = await summaryService.searchSummaries(query.trim(), page, limit);

      res.json({
        success: true,
        data: result.summaries,
        pagination: result.pagination,
        message: 'Search completed successfully'
      });
    } catch (error) {
      console.error('Search summaries error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to search summaries'
      });
    }
  }
}

export default SummaryController;