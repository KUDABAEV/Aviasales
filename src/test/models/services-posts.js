import { JSON_PLACEHOLDER_POSTS_URL } from './api';
import { client } from './client';
import { getUserById } from './services-users';
import { transformPost } from './test-utils';

export async function getPosts({ page = 1, limit = 5 } = {}) {
  const url = `${JSON_PLACEHOLDER_POSTS_URL}?_limit=${limit}&_page=${page}`;
  const posts = await client(url);
  return posts;
}

export async function getPostWithUser(props) {
  const posts = await getPosts(props);

  const promiseResult = posts.map(async (post) => {
    const user = await getUserById(post.userId);

    return transformPost(post, user);
  });

  return Promise.all(promiseResult);
}
