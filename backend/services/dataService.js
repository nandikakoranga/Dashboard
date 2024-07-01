const Data = require('../models/Data');

// Function to get all data
const getAllData = async () => {
    try {
        const data = await Data.find();
        return data;
    } catch (err) {
        throw new Error('Error fetching data: ' + err.message);
    }
};

// Function to get data with filters
const getFilteredData = async (filters) => {
    try {
        const query = {};

        if (filters.endYear) query.year = { $lte: filters.endYear };
        if (filters.topics && filters.topics.length > 0) query.topic = { $in: filters.topics };
        if (filters.sector) query.sector = new RegExp(filters.sector, 'i');
        if (filters.region) query.region = new RegExp(filters.region, 'i');
        if (filters.pest) query.pestle = new RegExp(filters.pest, 'i');
        if (filters.source) query.source = new RegExp(filters.source, 'i');
        if (filters.swot) query.insight = new RegExp(filters.swot, 'i');
        if (filters.country) query.country = filters.country;
        if (filters.city) query.city = new RegExp(filters.city, 'i');

        const data = await Data.find(query);
        return data;
    } catch (err) {
        throw new Error('Error fetching data: ' + err.message);
    }
};

module.exports = {
    getAllData,
    getFilteredData
};