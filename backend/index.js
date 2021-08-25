import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';

const app= express();
dotenv.config();

app.use(express.json()); 
app.use(express.urlencoded({extented:true}));
app.use(cors());

app.use('/user',userRoutes)

mongoose.connect(process.env.url,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => app.listen( process.env.PORT || 3200, () => console.log(`Server Running `)))
    .catch((error) => console.log(`${error} did not connect`));

const mongodbConnection = mongoose.connection;
mongodbConnection.on('open',function() {
    console.log('Mongo DB connected');
})
