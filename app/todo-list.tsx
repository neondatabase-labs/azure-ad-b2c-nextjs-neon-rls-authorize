"use client";

import { useContext } from "react";
import React from "react";
import { TodosContext } from "./todos-provider";

import styles from "../styles/Home.module.css";

export function TodoList() {
  const { todos } = useContext(TodosContext);

  // if loading, just show basic message
  if (todos === null) {
    return <div className={styles.label}>Loading...</div>;
  }

  // display all the todos
  return (
    <>
      {todos.length > 0 ? (
        <div className={styles.todoList}>
          <ol>
            {todos.map((todo) => (
              <li key={todo.id.toString()}>{todo.task}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div className={styles.label}>You don't have any todos!</div>
      )}
    </>
  );
}
