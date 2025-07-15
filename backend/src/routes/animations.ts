import { Router } from "express";
import { db } from "../../../db/drizzle";
import { promptTable } from "../../../db/schema";

const router = Router();

// POST /api/promptTable
router.post("/", async (req, res) => {
  const { prompt, manimCode } = req.body;

  if (!prompt || !manimCode) {
    return res.status(400).json({ error: "prompt and manimCode are required" });
  }

  try {
    const inserted = await db
      .insert(promptTable)
      .values({
        prompt,
        manimCode,
      })
      .returning();

    res.status(201).json(inserted[0]);
  } catch (err) {
    console.error("Error inserting animation:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
