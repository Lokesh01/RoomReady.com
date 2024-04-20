import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import colors from "colors";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

//* Connecting to database
mongoose
  .connect(process.env.MONGO_DB_URL as string)
  .then(() => console.log(colors.cyan("connected to mongo db successfully")))
  .catch((error) => console.log(colors.red(error.message)));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); //* server will only accept req from mentioned origin and req should include http cookies

//* serving static frontend
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

//* Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log(colors.blue("server running on port 8000"));
});
