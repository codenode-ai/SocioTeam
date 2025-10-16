import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const userStatusEnum = pgEnum("user_status", ["active", "inactive"]);
export const surveyStatusEnum = pgEnum("survey_status", ["draft", "active", "completed"]);
export const questionTypeEnum = pgEnum("question_type", ["positive", "negative", "neutral"]);
export const responseStatusEnum = pgEnum("response_status", ["pending", "completed"]);

// Tabelas
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  department: text("department").notNull(),
  position: text("position").notNull(),
  status: userStatusEnum("status").default("active"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by").notNull().references(() => users.id),
});

export const surveys = pgTable("surveys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  status: surveyStatusEnum("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by").notNull().references(() => users.id),
});

export const surveyQuestions = pgTable("survey_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  surveyId: varchar("survey_id").notNull().references(() => surveys.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  maxChoices: integer("max_choices").notNull().default(1),
  type: questionTypeEnum("type").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const surveyResponses = pgTable("survey_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  surveyId: varchar("survey_id").notNull().references(() => surveys.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const surveyResponseChoices = pgTable("survey_response_choices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  responseId: varchar("response_id").notNull().references(() => surveyResponses.id, { onDelete: "cascade" }),
  questionId: varchar("question_id").notNull().references(() => surveyQuestions.id),
  choiceEmployeeId: varchar("choice_employee_id").notNull().references(() => employees.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const surveyLinks = pgTable("survey_links", {
  token: varchar("token").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  surveyId: varchar("survey_id").notNull().references(() => surveys.id),
  status: responseStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  expiresAt: timestamp("expires_at"),
});

export const teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by").notNull().references(() => users.id),
});

export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamId: varchar("team_id").notNull().references(() => teams.id, { onDelete: "cascade" }),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Esquemas de validação Zod
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertEmployeeSchema = createInsertSchema(employees).pick({
  name: true,
  email: true,
  department: true,
  position: true,
  status: true,
  avatar: true,
  createdBy: true,
});

export const insertSurveySchema = createInsertSchema(surveys).pick({
  name: true,
  description: true,
  createdBy: true,
});

export const insertSurveyQuestionSchema = createInsertSchema(surveyQuestions).pick({
  surveyId: true,
  text: true,
  maxChoices: true,
  type: true,
  order: true,
});

export const insertSurveyResponseSchema = createInsertSchema(surveyResponses).pick({
  employeeId: true,
  surveyId: true,
});

export const insertSurveyLinkSchema = createInsertSchema(surveyLinks).pick({
  employeeId: true,
  surveyId: true,
});

export const insertTeamSchema = createInsertSchema(teams).pick({
  name: true,
  description: true,
  createdBy: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type InsertSurvey = z.infer<typeof insertSurveySchema>;
export type InsertSurveyQuestion = z.infer<typeof insertSurveyQuestionSchema>;
export type InsertSurveyResponse = z.infer<typeof insertSurveyResponseSchema>;
export type InsertSurveyLink = z.infer<typeof insertSurveyLinkSchema>;
export type InsertTeam = z.infer<typeof insertTeamSchema>;

export type User = typeof users.$inferSelect;
export type Employee = typeof employees.$inferSelect;
export type Survey = typeof surveys.$inferSelect;
export type SurveyQuestion = typeof surveyQuestions.$inferSelect;
export type SurveyResponse = typeof surveyResponses.$inferSelect;
export type SurveyLink = typeof surveyLinks.$inferSelect;
export type Team = typeof teams.$inferSelect;
