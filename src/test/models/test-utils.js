export function transformPost(post, user) {
  return {
    id: post.id,
    title: post.title,
    body: post.body,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  };
}
