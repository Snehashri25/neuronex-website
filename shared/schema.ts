import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  profileImage: text("profile_image"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  bio: text("bio"),
  jobTitle: text("job_title"),
  organization: text("organization"),
  preferences: jsonb("preferences"),
  createdAt: text("created_at").default("NOW()"),
});

// Task schema
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("todo"), // "todo", "in-progress", "completed"
  priority: text("priority").default("medium"), // "high", "medium", "low"
  category: text("category"),
  dueDate: text("due_date"),
  userId: integer("user_id").notNull(),
  projectId: integer("project_id"),
  assignees: jsonb("assignees"), // Array of user IDs
  completed: boolean("completed").default(false),
  createdAt: text("created_at").default("NOW()"),
});

// Project schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").default("active"), // "active", "on-hold", "completed"
  progress: integer("progress").default(0),
  dueDate: text("due_date"),
  userId: integer("user_id").notNull(),
  members: jsonb("members"), // Array of user IDs
  createdAt: text("created_at").default("NOW()"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  profileImage: true,
  firstName: true,
  lastName: true,
  email: true,
  bio: true,
  jobTitle: true,
  organization: true,
  preferences: true,
}).omit({ profileImage: true, firstName: true, lastName: true, email: true, bio: true, jobTitle: true, organization: true, preferences: true });

export const insertTaskSchema = createInsertSchema(tasks);
export const insertProjectSchema = createInsertSchema(projects);

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type User = typeof users.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Project = typeof projects.$inferSelect;
