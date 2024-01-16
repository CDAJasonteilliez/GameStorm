import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOption.js";
import routes from "./routes/index.js";
import connection from "./database/index.js";
import "dotenv/config";

// Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connection database
connection;

// Middleware
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

app.all("*", (req,res) => {
    res.status(404).json({
        error: "404 - not found", 
        message: "Nous ne trouvons pas votre requête"
    });
});

// Listen
app.listen(PORT, () => {
    console.log(`Server runnig at http://localhost:${PORT}`);
});