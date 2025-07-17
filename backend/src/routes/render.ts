// server/routes/render.ts (or inside your existing router)

import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/api/render", async (req, res) => {
  try {
    const { manimCode } = req.body;

    if (!manimCode) {
      return res.status(400).json({ error: "manimCode is required" });
    }

    const id = uuidv4();
    const filename = `scene_${id}.py`;
    const filepath = path.join(__dirname, "../../manim_scripts", filename);

    // Make sure the directory exists
    fs.mkdirSync(path.dirname(filepath), { recursive: true });

    // Wrap code in a valid Manim Scene
    const wrappedCode = `
from manim import *

class HelloWorld(Scene):
    def construct(self):
        ${manimCode}
`;

    fs.writeFileSync(filepath, wrappedCode);

    const dockerCommand = `docker run --rm -v "${path.resolve(
      "manim_scripts"
    )}:/app" manim-runtime manim ${filename} HelloWorld -o -ql`;

    exec(dockerCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("Render error:", stderr);
        return res.status(500).json({ error: "Video render failed" });
      }

      const outputPath = path.join(
        __dirname,
        `../../manim_scripts/media/videos/${filename.replace(
          ".py",
          ""
        )}/480p15/HelloWorld.mp4`
      );

      if (!fs.existsSync(outputPath)) {
        return res.status(500).json({ error: "Output video not found" });
      }

      // send the video as a file
      res.sendFile(outputPath);
    });
  } catch (err) {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Unexpected error" });
  }
});

export default router;
