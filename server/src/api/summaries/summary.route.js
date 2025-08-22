import express from 'express';
import SummaryController from './summary.controller.js';

const router = express.Router();
const summaryController = new SummaryController();

// POST /api/summaries - Create a new summary
router.post('/', summaryController.createSummary);

// GET /api/summaries - Get all summaries with pagination
router.get('/', summaryController.getAllSummaries);

// GET /api/summaries/search - Search summaries
router.get('/search', summaryController.searchSummaries);

// GET /api/summaries/:id - Get summary by ID
router.get('/:id', summaryController.getSummaryById);

// DELETE /api/summaries/:id - Delete summary by ID
router.delete('/:id', summaryController.deleteSummary);

export default router;