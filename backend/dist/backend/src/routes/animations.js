"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const drizzle_1 = require("../../../db/drizzle");
const schema_1 = require("../../../db/schema");
const router = (0, express_1.Router)();
// POST /api/promptTable
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt, manimCode } = req.body;
    if (!prompt || !manimCode) {
        return res.status(400).json({ error: "prompt and manimCode are required" });
    }
    try {
        const inserted = yield drizzle_1.db
            .insert(schema_1.promptTable)
            .values({
            prompt,
            manimCode,
        })
            .returning();
        res.status(201).json(inserted[0]);
    }
    catch (err) {
        console.error("Error inserting animation:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
