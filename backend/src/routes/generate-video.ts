import { exec } from "child_process";
import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

router.post("/generate-video", async (req, res) => {
  const { manimCode, sceneName } = req.body;

  // 1. Save manimCode to a temporary .py file
  const tempFilePath = path.join(__dirname, "temp_code.py");
  fs.writeFileSync(tempFilePath, manimCode);

  // 2. Run docker command to generate video
  const cmd = `docker run --rm -v ${__dirname}:/app manim-runtime manim temp_code.py ${sceneName} -pql`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error("Error running docker:", error);
      return res.status(500).json({ error: "Video generation failed" });
    }

    // 3. Video will be at something like ./media/videos/temp_code/480p15/${sceneName}.mp4
    const videoPath = path.join(
      __dirname,
      "media",
      "videos",
      "temp_code",
      "480p15",
      `${sceneName}.mp4`
    );

    // 4. Return the video path or upload & return URL
    res.json({ videoPath });
  });
});

export default router;
