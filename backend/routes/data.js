const express = require('express');
const router = express.Router();
const dataService = require('../services/dataService');

// Get all data
router.get('/', async (req, res) => {
    try {
        const data = await dataService.getAllData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get filtered data
router.post('/filter', async (req, res) => {
    try {
        const filters = req.body;
        const data = await dataService.getFilteredData(filters);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;