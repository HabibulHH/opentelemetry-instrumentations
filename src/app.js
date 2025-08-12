const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes');

const app = express();



app.use(cors());
app.use(express.json());
app.use(helmet())

app.use('/api/users',userRoutes);
app.use(errorHandler);







module.exports = app;