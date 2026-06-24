import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import './App.css';

function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [filter, setFilter] = useState('all');

  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }), [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <div className="app">
      <div className="todo-container">
        <h1 className="todo-title">Todo List</h1>

        <TodoInput onAdd={addTodo} />

        <TodoFilter
          filter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p className="loading">불러오는 중...</p>
        ) : filteredTodos.length === 0 ? (
          <p className="empty-message">
            {filter === 'completed' ? '완료된 할 일이 없습니다.' : '할 일을 추가해보세요!'}
          </p>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        )}

        {counts.completed > 0 && (
          <p className="todo-summary">
            {counts.completed}/{counts.all}개 완료
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
