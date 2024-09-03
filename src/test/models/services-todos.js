import { JSON_PLACEHOLDER_TODOS_URL } from './api';
import { client } from './client';

export async function getTodos() {
  const url = JSON_PLACEHOLDER_TODOS_URL;
  const todos = await client(url);
  return todos;
}

export async function addTodo(body) {
  const url = JSON_PLACEHOLDER_TODOS_URL;
  const newTodo = await client.post(url, { body });

  return newTodo;
}
