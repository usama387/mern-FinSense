import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expenseRouter from "./routes/expense.route.js";

// App Config
const app = express();

// to access environment variables in .env file
dotenv.config();

// middlewares
app.use(express.json());

// Allow ALL origins
const allowedOrigins = [
  // process.env.PRODUCTION, // Production from env
  // "http://localhost:5173", // Localhost for development
  "https://finsense-ai.vercel.app", // Localhost for development
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["set-cookie"],
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// expense api end point
app.use("/api/expense", expenseRouter)


// test api end point
app.get("/", (req, res) => {
  res.send("FinSense backend is running successfully...");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`The backend is up on port ${port}`);
});
