import { Router } from "express";
import { db } from "../../../db/drizzle";
import { promptTable } from "../../../db/schema";
import { desc } from "drizzle-orm";

const router = Router();

// POST /api/promptTable
router.post("/", async (req, res) => {
  const { prompt, manimCode } = req.body;

  if (!prompt || !manimCode) {
    return res.status(400).json({ error: "prompt and manimCode are required" });
  }

  try {
    // const code = await result.response.text();
    // const [inserted] = await db
    //   .insert(projects)
    //   .values({ prompt, code })
    //   .returning();
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

router.get("/", async (req, res) => {
  try {
    const animations = await db
      .select()
      .from(promptTable)
      .orderBy(desc(promptTable.createdAt));
    res.status(200).json(animations);
  } catch (error) {
    console.error("Error fetcing animations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
