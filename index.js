const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const petRoutes = require("./routes/pets");
const errorHandler = require("./middleware/errorHandler");
const app = express();

dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({
        message: "working"
    });
});

app.use("/pets", petRoutes);

app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server listening on port ${PORT}`);
});