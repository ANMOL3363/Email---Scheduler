
import "dotenv/config";
import express from "express";
import passport from "./config/passport";
import emailRoutes from "./routes/email.routes";
import authRoutes from "./routes/auth.routes";


const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use("/api/emails", emailRoutes);
app.use("/auth", authRoutes);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
