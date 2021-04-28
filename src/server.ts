import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";

import authRoutes from './routes/auth';

import trim from './middleware/trim';

const app = express();

//accespt json request. This replaces body-parser
app.use(express.json());
app.use(morgan("dev"));
app.use(trim)

app.get("/", (req, res) => res.send("Hello world"));
app.use('/api', authRoutes)

app.listen(5000, async () => {
    console.log("Server running at http://localhost:5000");
    try {
        //function to connect to typeorm database
        await createConnection();
        console.log("Database connected!")
    } catch (err) {
        console.log(err)
    }
});
