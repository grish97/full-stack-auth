import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import envConfig from "./configs/envConfig.js";

// DB connection
import "./db/db.js";

// routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";

// cors
import credentials from "./middleware/credentials.js";
import corsOptions from "./configs/corsOptions.js";

const app = express();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(envConfig.PORT, () => {
  console.log("Conected");
});
