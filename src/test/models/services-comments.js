import { JSON_PLACEHOLDER_COMMENTS_URL } from './api';
import { client } from './client';

export async function getCommentsAll() {
  const url = `${JSON_PLACEHOLDER_COMMENTS_URL}`;
  const comments = await client(url);
  return comments;
}

export async function getCommentsByPostId(postId) {
  const url = `${JSON_PLACEHOLDER_COMMENTS_URL}/${postId}`;
  const comments = await client(url);
  return comments;
}
