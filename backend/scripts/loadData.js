const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Data = require('../models/Data'); // Adjust the path as needed

// Load environment variables from .env file
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Read data from JSON file
fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        process.exit(1);
    }

    const jsonData = JSON.parse(data);

    // Insert data into MongoDB
    Data.insertMany(jsonData)
        .then(() => {
            console.log('Data successfully loaded into MongoDB');
            mongoose.connection.close();
        })
        .catch((err) => {
            console.error('Error inserting data into MongoDB:', err);
            mongoose.connection.close();
        });
});