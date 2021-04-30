import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import subRoutes from './routes/subs';
import commentRoutes from './routes/comment';

import trim from './middleware/trim';

const app = express();

//accespt json request. This replaces body-parser
app.use(express.json());
app.use(morgan("dev"));
//apply middleware to trim incomming request
app.use(trim)
app.use(cookieParser())
app.use(cors({
    credentials: true, //allow cookier to be received from the client
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
}))

app.get("/", (_, res) => res.send("Hello world"));
app.use('/api/auth/', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/subs', subRoutes)
app.use('/api', commentRoutes)

const PORT = process.env.PORT

app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);
    try {
        //function to connect to typeorm database
        await createConnection();
        console.log("Database connected!")
    } catch (err) {
        console.log(err)
    }
});
