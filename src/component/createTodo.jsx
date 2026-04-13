import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTodo } from "../api/apiFunctions";
import AllTodos from "./allTodos";

export default function MakeTodo() {
  const [todo, setTodo] = useState("");
  const [enterTodo, setEnterTodo] = useState(false);

  // using react-query's useMutation to handle the creation of a new todo and invalidation of queries for caching.
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      console.log("Todo created successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTodo("");
    },
  });

  // handle form submission to create a new todo.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) {
      setEnterTodo(true);
      return;
    } else if (todo.trim()) {
      mutate({ todo: todo });
      console.log("Submitting todo:", todo);
    }
  };

  return (
    <div className="bg-blue-950 text-white w-full lg:w-[50%] p-10 lg:p-20 lg:h-fit h-screen shadow-2xl rounded-lg lg:border-3 lg:border-white flex flex-col gap-8 justify-center">
      <h1 className="text-3xl lg:text-4xl font-bold text-center">Todo App</h1>
      <div>
        <form
          action=""
          className="flex justify-between flex-col gap-5 mt-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a new todo"
            className="border border-white rounded-sm p-3 focus:outline-none"
          />
          {enterTodo && <p className="text-red-400">Enter a todo</p>}
          <button
            type="submit"
            className="bg-white text-blue-950 cursor:pointer rounded-sm font-bold py-2"
          >
            Add Todo
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
      </div>

      <AllTodos />
    </div>
  );
}
