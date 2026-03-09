import { pgTable, text, uuid, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  fullName: text('full_name'),
  email: text('email'),
  stripeCustomerId: text('stripe_customer_id'),
});

export const todos = pgTable('todos', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  completed: boolean('completed').default(false).notNull(),
  imagePath: text('image_path'),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});