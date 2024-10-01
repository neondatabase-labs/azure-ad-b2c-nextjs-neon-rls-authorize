"use client";

import { useMsal } from "@azure/msal-react";
import { insertTodo } from "../app/actions";
import { CSSProperties, useContext, useRef } from "react";
import { TodosContext } from "app/todos-provider";

const styles = {
  form: {
    display: "flex",
    marginBottom: "20px",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
} satisfies Record<string, CSSProperties>;

export function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { instance } = useMsal();
  const { todos, setTodos } = useContext(TodosContext);

  const activeAccount = instance.getActiveAccount();

  const onSubmit = async (formData: FormData) => {
    const newTodo = formData.get("newTodo");

    if (!newTodo) {
      throw new Error("No newTodo");
    }

    if (typeof newTodo !== "string") {
      throw new Error("The newTodo must be a string");
    }

    if (!activeAccount || !activeAccount.idToken) {
      throw new Error("No account or no token");
    }

    if (todos === null) {
      throw new Error("No todos defined");
    }

    const insertedTodo = await insertTodo({
      authToken: activeAccount.idToken,
      newTodo: newTodo.toString(),
    });

    setTodos([...todos, insertedTodo]);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={onSubmit} style={styles.form}>
      <input
        required
        name="newTodo"
        placeholder="Enter a new todo"
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add Todo
      </button>
    </form>
  );
}
