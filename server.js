const express = require('express');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');


dotenv.config();

const port = process.env.PORT || 5000;
const app = express();


// Middleware
// difference between the two is the type of data they can handle. express.json() is used for parsing JSON data, while express.urlencoded() is used for parsing URL-encoded form data.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/goals', require('./routes/goalRoutes'))


// override the default error handler of express
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));