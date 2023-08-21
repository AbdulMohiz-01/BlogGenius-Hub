const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
console.log(typeof MONGO_URI)
console.log(PORT)
mongoose.connect(MONGO_URI, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
});

const blogRoutes = require('./routes/blogRoutes.js');

app.use('/api', blogRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
