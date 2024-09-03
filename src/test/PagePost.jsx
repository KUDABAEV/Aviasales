import React, { useState } from 'react';
import { getPostWithUser } from './models/services-posts';

function User({ id, email, name }) {
  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{email}</div>
    </div>
  );
}

function Post({ id, title, body, user }) {
  return (
    <div style={{ padding: '10px', background: 'yellow' }}>
      <div>{id}</div>
      <h2>{title}</h2>
      <div>{body}</div>
      <User {...user} />
    </div>
  );
}

export function PageTest() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getPostWithUser()
      .then((postsApi) => setPosts(postsApi))
      .catch((error) => setIsError(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleNextPage = () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getPostWithUser({ page: nextPage })
      .then((nextData) => setPosts([...posts, ...nextData]))
      .catch((error) => setIsError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {!isError && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      )}
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && !isError && <button onClick={handleNextPage}>Загрузить еще</button>}
    </>
  );
}
