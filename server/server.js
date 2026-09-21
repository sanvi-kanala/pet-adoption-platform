require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const petRouter = require('./Routes/PetRoute');
const AdoptFormRoute = require('./Routes/AdoptFormRoute');
const AdminRoute = require('./Routes/AdminRoute');
const cors = require('cors');
const path = require('path');
const { connectRedis } = require('./redisClient');

const app = express();

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(petRouter);
app.use('/form', AdoptFormRoute);
app.use('/admin', AdminRoute);

async function startServer() {
    try {
        await mongoose.connect(process.env.mongooseURL);
        console.log('Connected to DB');

        await connectRedis();
        console.log('Connected to Redis');

        const PORT = 4000;

        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });

    } catch (err) {
        console.error('Server startup error:', err);
    }
}

startServer();