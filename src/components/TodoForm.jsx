import React, { useState, useEffect } from 'react';

const TodoForm = ({ addTodo, editingTodo, updateTodo, setEditingTodo }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
    } else {
      setText('');
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingTodo) {
      updateTodo({ ...editingTodo, text: text.trim() });
      setEditingTodo(null);
    } else {
      addTodo(text.trim());
    }
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder={editingTodo ? 'Edit todo...' : 'Add a new todo...'}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        {editingTodo ? 'Update Todo' : 'Add Todo'}
      </button>
      {editingTodo && (
        <button type="button" onClick={() => setEditingTodo(null)} className="todo-cancel-button">
          Cancel
        </button>
      )}
    </form>
  );
};

export default TodoForm;