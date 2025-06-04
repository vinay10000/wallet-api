import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";
dotenv.config();
const PORT = process.env.PORT || 5001;

if(process.env.NODE_ENV === "production"){
    job.start();
}
const app = express();
//middleware
app.get("/api/health", (req, res) => {
    res.status(200).json({status: "OK"});
})
app.use(express.json());
app.use("/api/transactions", transactionsRoute);
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
