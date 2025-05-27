import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo, startEditing }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleComplete(todo.id)} className="todo-text">
        {todo.text}
      </span>
      <div className="todo-actions">
        <button onClick={() => startEditing(todo)} className="edit-button">
          Edit
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="delete-button">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;