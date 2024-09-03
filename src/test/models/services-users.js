import { JSON_PLACEHOLDER_USERS_URL } from './api';
import { client } from './client';

export async function getUsers() {
  const url = `${JSON_PLACEHOLDER_USERS_URL}`;
  const users = await client(url);
  return users;
}

export async function getUserById(id) {
  const url = `${JSON_PLACEHOLDER_USERS_URL}/${id}`;
  const user = await client(url);
  return user;
}
