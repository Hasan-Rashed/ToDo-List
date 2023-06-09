const express = require('express');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');


dotenv.config();

connectDB();

const port = process.env.PORT || 5000;
const app = express();

// CORS
app.use(cors());


// Middleware
// difference between the two is the type of data they can handle. express.json() is used for parsing JSON data, while express.urlencoded() is used for parsing URL-encoded form data.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes')) // it will pertain to userRoutes.js file


// override the default error handler of express
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));