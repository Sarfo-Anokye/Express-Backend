import express, {Application} from "express";
import cors from "cors";
import helmet from "helmet";
import sanitizeMiddleware from "./src/middleware/sanitize-middleware";

const app: Application = express();
// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(sanitizeMiddleware);
app.use(express.urlencoded({extended: true}));

// Routes
// app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
