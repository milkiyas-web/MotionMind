import express from "express";
import animationsRoute from "./routes/animations";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/animations", animationsRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
