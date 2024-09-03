import React from 'react';
import { addTodo, getTodos } from './models/services-todos';

function Todos({ todos }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {todos.map((todo) => {
        return (
          <div key={todo.id} style={{ padding: '10px', background: 'aqua' }}>
            {todo.id}...
            {todo.title}
          </div>
        );
      })}
    </div>
  );
}

export function PageTest() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    getTodos().then((todo) => {
      setTodos(todo);
    });
  }, []);

  const handleAddTodo = () => {
    addTodo().then((todo) => {
      console.log(todo);
    });
  };

  return (
    <div>
      <div>PageTest</div>
      <button onClick={handleAddTodo}>Добавить todo</button>
      <Todos todos={todos} />
    </div>
  );
}
