"use client";

import React from "react";
import { useMsal } from "@azure/msal-react";
import { createContext, useEffect, useState } from "react";
import { getTodos } from "./actions";

// TODO: Import this type from Drizzle once Drizzle works on the browser
export type Todo = {
  id: BigInt;
  userId: string;
  task: string;
  isComplete: boolean;
  insertedAt: Date;
};

export const TodosContext = createContext<{
  todos: Array<Todo> | null;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo> | null>>;
}>({
  todos: null,
  setTodos: () => {},
});

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Array<Todo> | null>(null);
  const { instance } = useMsal();

  const activeAccount = instance.getActiveAccount();

  useEffect(() => {
    if (
      !activeAccount ||
      !activeAccount.idToken ||
      !activeAccount.idTokenClaims?.sub
    ) {
      return;
    }

    getTodos({
      authToken: activeAccount.idToken,
      userId: activeAccount.idTokenClaims?.sub,
    }).then((todos) => setTodos(todos));
  }, [getTodos, activeAccount?.idToken, activeAccount?.idTokenClaims?.sub]);

  if (!activeAccount || todos === null) {
    return null;
  }

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}
