import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        message: "Reddit backend is working!"
    });
});

export default app;