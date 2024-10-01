import * as React from "react";
import { Typography } from "@mui/material";
import { TodoList } from "./todo-list";
import { TodosProvider } from "./todos-provider";
import { AddTodoForm } from "src/add-todo";

export default async function Home() {
  return (
    <div>
      <Typography variant="h5" marginTop="50px">
        <center>
          Welcome to the Microsoft Authentication Library For React Next.js
          Quickstart
        </center>
      </Typography>

      <TodosProvider>
        <AddTodoForm />
        <TodoList />
      </TodosProvider>
    </div>
  );
}
