import React from "react";
import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchTodos, deleteTodo, updateTodo } from "../api/apiFunctions";

export default function AllTodos() {
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");
  const queryClient = useQueryClient();
  // Function to fetch all todos from supabse
  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  //   Function to delete a todo by id
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      console.log("Todo deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },

    onError: (error) => {
      console.log("Error deleting todo:", error);
    },
  });

  //   Function to update a todo by id
  const { mutate: updateMutate } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      console.log("Todo updated successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },

    onError: () => {
      console.log("Error updating todo");
    },
  });

  //   handleUpdate
  const handleUpdate = (id) => {
    updateMutate({
      id: id,
      updatedTodo: editText,
    });

    setEditTodo(null);
    setEditText("");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div>
      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-gray-800 text-white p-4 rounded-lg mb-2">
              {editTodo === todo.id ? (
                <div className="flex justify-between w-full gap-4">
                  <input
                    type="text"
                    name="editText"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border-0.5 border-white focus:outline-none"
                  />{" "}
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="bg-white px-2 text-blue-700 rounded cursor-pointer hover:font-bold shadow"
                  >
                    SAVE
                  </button>
                </div>
              ) : (
                <p className="text-center">{todo.todo}</p>
              )}
              <div className="flex gap-4">
                <button
                  onClick={() => deleteMutate(todo.id)}
                  className="bg-white px-2 text-blue-700 rounded cursor-pointer hover:font-bold shadow"
                >
                  DELETE
                </button>
                <button
                  onClick={() => {
                    setEditTodo(todo.id);
                    setEditText(todo.todo);
                  }}
                  className="bg-white px-2 text-blue-700 rounded cursor-pointer hover:font-bold shadow"
                >
                  EDIT
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
