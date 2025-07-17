import express from "express";
import animationsRoute from "./routes/animations";
import generateVideo from "./routes/generate-video";
import renderRouter from "./routes/render";
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/animations", animationsRoute);
app.use("/generate-video", generateVideo);
app.use(renderRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
