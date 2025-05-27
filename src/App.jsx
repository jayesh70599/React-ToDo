import React, { useState, useEffect, useMemo } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInitialTodos();
  }, []);

  const fetchInitialTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const data = await response.json();
      const initialTodos = data.map((todo) => ({
        id: todo.id,
        text: todo.title,
        completed: todo.completed,
      }));
      setTodos(initialTodos);
    } catch (error) {
      console.error('Error fetching initial todos:', error);
      setTodos([]);
    }
  };

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
    setEditingTodo(null);
  };

  const deleteAllCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
    setEditingTodo(null);
  };

  const markAllCompleted = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: true })));
    setEditingTodo(null);
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;

  return (
    <div className="App">
      <h1 className="app-title">React Todo List</h1>

      <TodoForm
        addTodo={addTodo}
        editingTodo={editingTodo}
        updateTodo={updateTodo}
        setEditingTodo={setEditingTodo}
      />

      <div className="stats-and-controls">
        <div className="task-indicators">
          <p>Total Tasks: <strong>{totalTasks}</strong></p>
          <p>Completed: <strong>{completedTasks}</strong></p>
        </div>

        <div className="action-buttons">
          <button onClick={markAllCompleted} className="mark-all-button">
            Mark All Completed
          </button>
          <button onClick={deleteAllCompleted} className="delete-completed-button">
            Delete All Completed
          </button>
        </div>

        <div className="filter-buttons">
          <button
            onClick={() => setFilter('all')}
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
          >
            Completed
          </button>
        </div>
      </div>
      
      {/* --- NEW: Conditional Message for No Todos --- */}
      {filteredTodos.length === 0 && (
        <p className="no-todos-message">
          No tasks to show. <br />
          {filter === 'all' && 'Add a new todo above!'}
          {filter === 'active' && 'All active tasks are completed or you have no tasks!'}
          {filter === 'completed' && 'No completed tasks yet!'}
        </p>
      )}

      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        startEditing={startEditing}
      />
    </div>
  );
};

export default App;
