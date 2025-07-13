import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { toggleTodo, updateTodo, deleteTodo } from '../redux/todoSlice';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (editText.trim()) {
      dispatch(updateTodo({ id: todo.id, text: editText }));
      setIsEditing(false);
    }
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <div className="edit-input-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <div className="todo-actions">
            <button onClick={handleUpdate} className="save-button">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-item-content">
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
              className="todo-checkbox"
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.text}
            </span>
          </div>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit
            </button>
            <button onClick={() => dispatch(deleteTodo(todo.id))} className="delete-button">
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;