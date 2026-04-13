import React from "react";

import { supabase } from "../supabaseClient";

// function to fetch all todos.
export async function fetchTodos() {
  const res = await supabase
    .from("Todos")
    .select("*")
    .order("id", { ascending: false });

  const { data, error } = res;

  if (error) {
    console.log("Error fetching todos:", error);
    return [];
  }

  return data;
}

// function to add a new todo.
export async function createTodo(newTodo) {
  const res = await supabase.from("Todos").insert([newTodo]).single();

  const { data, error } = res;

  if (error) {
    throw new Error("Error creating todo:", error);
  }

  return data;
}

// function to delete todo by id
export async function deleteTodo(id) {
  const res = await supabase.from("Todos").delete().eq("id", id);

  const { data, error } = res;

  if (error) {
    throw new Error("Error deleting todo:", error);
  }

  return data;
}

// function to update todo by id
export async function updateTodo({ id, updatedTodo }) {
  const res = await supabase
    .from("Todos")
    .update({ todo: updatedTodo })
    .eq("id", id)
    .select();

  const { data, error } = res;

  if (error) {
    throw new Error("Error updating todo:", error);
  }

  return data;
}
