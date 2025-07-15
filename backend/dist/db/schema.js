"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptTable = exports.postsTable = exports.projects = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.usersTable = (0, pg_core_1.pgTable)("users_table", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    age: (0, pg_core_1.integer)("age").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
});
exports.projects = (0, pg_core_1.pgTable)("projects", {
    id: (0, pg_core_1.uuid)("id")
        .default((0, drizzle_orm_1.sql) `gen_random_uuid()`)
        .primaryKey(),
    prompt: (0, pg_core_1.text)("prompt").notNull(),
    code: (0, pg_core_1.text)("code").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.postsTable = (0, pg_core_1.pgTable)("posts_table", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.usersTable.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .notNull()
        .$onUpdate(() => new Date()),
});
exports.promptTable = (0, pg_core_1.pgTable)("prompt_table", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    prompt: (0, pg_core_1.text)("content").notNull(),
    manimCode: (0, pg_core_1.text)("manim_code").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
