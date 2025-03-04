import express from "express";
import { Request, Response } from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./MiddleWare/globalErrorHandler";

// declare app variable.
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["https://socialmedia10400.vercel.app","http://localhost:3000"], credentials: true }));
app.use("/api", routes);

app.use(globalErrorHandler);
// handle invalid route.
app.use((req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Welcome to the root route.",
  });
});

// export app.
export default app;
