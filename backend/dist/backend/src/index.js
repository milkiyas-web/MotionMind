"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const animations_1 = __importDefault(require("./routes/animations"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use("/api/animations", animations_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
