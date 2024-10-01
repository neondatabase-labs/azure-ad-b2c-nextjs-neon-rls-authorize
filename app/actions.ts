"use server";

import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/schema";
import { Todo } from "../src/schema";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";

function getDb(authToken: string) {
  return drizzle(neon(process.env.DATABASE_AUTHENTICATED_URL!, { authToken }), {
    schema,
  });
}

export async function insertTodo({
  newTodo,
  authToken,
}: {
  newTodo: string;
  authToken: string;
}) {
  const db = await getDb(authToken);
  const insertedTodo = await db
    .insert(schema.todos)
    .values({
      task: newTodo,
      isComplete: false,
    })
    .returning();
  return insertedTodo[0];
}

export async function getTodos({
  userId,
  authToken,
}: {
  userId: string;
  authToken: string;
}): Promise<Array<Todo>> {
  // WHERE filter is optional because of RLS. But we send it anyway for
  // performance reasons.
  return getDb(authToken)
    .select()
    .from(schema.todos)
    .where(eq(schema.todos.userId, userId));
}
