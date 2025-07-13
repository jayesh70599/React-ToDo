// // src/components/TodoList.jsx
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { fetchInitialTodos, addTodo, setFilter } from '../redux/todoSlice';
// import TodoItem from './TodoItem';

// function TodoList() {
//   const dispatch = useDispatch();
//   const todos = useSelector((state) => state.todos.todos);
//   const filter = useSelector((state) => state.todos.filter);
//   const status = useSelector((state) => state.todos.status);
//   const error = useSelector((state) => state.todos.error);
//   const [newTodo, setNewTodo] = useState('');

//   useEffect(() => {
//     dispatch(fetchInitialTodos());
//   }, [dispatch]);

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === 'active') return !todo.completed;
//     if (filter === 'completed') return todo.completed;
//     return true;
//   });

//   const handleAddTodo = (e) => {
//     e.preventDefault();
//     if (newTodo.trim()) {
//       dispatch(addTodo(newTodo));
//       setNewTodo('');
//     }
//   };

//   return (
//     <div className="todo-container">
//       <h1>Todo List</h1>

//       {/* Status and Error */}
//       {status === 'loading' && <p className="loading">Loading...</p>}
//       {status === 'failed' && <p className="error">{error}</p>}

//       {/* Add Todo */}
//       <div className="todo-input-container">
//         <input
//           type="text"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           placeholder="Add a new todo"
//           className="todo-input"
//         />
//         <button onClick={handleAddTodo} className="add-button">
//           Add Todo
//         </button>
//       </div>

//       {/* Filter Buttons */}
//       <div className="filter-buttons">
//         <button
//           onClick={() => dispatch(setFilter('all'))}
//           className={`filter-button ${filter === 'all' ? 'active' : ''}`}
//         >
//           All
//         </button>
//         <button
//           onClick={() => dispatch(setFilter('active'))}
//           className={`filter-button ${filter === 'active' ? 'active' : ''}`}
//         >
//           Active
//         </button>
//         <button
//           onClick={() => dispatch(setFilter('completed'))}
//           className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
//         >
//           Completed
//         </button>
//       </div>

//       {/* Todo List */}
//       <ul>
//         {filteredTodos.map((todo) => (
//           <TodoItem key={todo.id} todo={todo} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TodoList;

// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { fetchInitialTodos, addTodo, setFilter, markAllCompleted, deleteAllCompleted } from '../redux/todoSlice';
// import TodoItem from './TodoItem';

// function TodoList() {
//   const dispatch = useDispatch();
//   const todos = useSelector((state) => state.todos.todos);
//   const filter = useSelector((state) => state.todos.filter);
//   const status = useSelector((state) => state.todos.status);
//   const error = useSelector((state) => state.todos.error);
//   const [newTodo, setNewTodo] = useState('');

//   useEffect(() => {
//     dispatch(fetchInitialTodos());
//   }, [dispatch]);

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === 'active') return !todo.completed;
//     if (filter === 'completed') return todo.completed;
//     return true;
//   });

//   const handleAddTodo = (e) => {
//     e.preventDefault();
//     if (newTodo.trim()) {
//       dispatch(addTodo(newTodo));
//       setNewTodo('');
//     }
//   };

//   return (
//     <div className="todo-container">
//       <h1>Todo List</h1>

//       {/* Status and Error */}
//       {status === 'loading' && <p className="loading">Loading...</p>}
//       {status === 'failed' && <p className="error">{error}</p>}

//       {/* Add Todo */}
//       <div className="todo-input-container">
//         <input
//           type="text"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           placeholder="Add a new todo"
//           className="todo-input"
//         />
//         <button onClick={handleAddTodo} className="add-button">
//           Add Todo
//         </button>
//       </div>

//       {/* Filter Buttons */}
//       <div className="filter-buttons">
//         <button
//           onClick={() => dispatch(setFilter('all'))}
//           className={`filter-button ${filter === 'all' ? 'active' : ''}`}
//         >
//           All
//         </button>
//         <button
//           onClick={() => dispatch(setFilter('active'))}
//           className={`filter-button ${filter === 'active' ? 'active' : ''}`}
//         >
//           Active
//         </button>
//         <button
//           onClick={() => dispatch(setFilter('completed'))}
//           className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
//         >
//           Completed
//         </button>
//       </div>

//       {/* Action Buttons */}
//       <div className="action-buttons">
//         <button
//           onClick={() => dispatch(markAllCompleted())}
//           className="mark-all-button"
//         >
//           Mark All Completed
//         </button>
//         <button
//           onClick={() => dispatch(deleteAllCompleted())}
//           className="delete-all-completed-button"
//         >
//           Delete All Completed
//         </button>
//       </div>

//       {/* Todo List */}
//       <ul>
//         {filteredTodos.map((todo) => (
//           <TodoItem key={todo.id} todo={todo} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TodoList;

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchInitialTodos, addTodo, setFilter, markAllCompleted, deleteAllCompleted } from '../redux/todoSlice';
import TodoItem from './TodoItem';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    dispatch(fetchInitialTodos());
  }, [dispatch]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>

      {/* Status and Error */}
      {status === 'loading' && <p className="loading">Loading...</p>}
      {status === 'failed' && <p className="error">{error}</p>}

      {/* Add Todo */}
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="add-button">
          Add Todo
        </button>
        <p className="task-indicator">
          Total Tasks: {totalTasks}, Completed: {completedTasks}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          onClick={() => dispatch(setFilter('all'))}
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter('active'))}
          className={`filter-button ${filter === 'active' ? 'active' : ''}`}
        >
          Active
        </button>
        <button
          onClick={() => dispatch(setFilter('completed'))}
          className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
        >
          Completed
        </button>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          onClick={() => dispatch(markAllCompleted())}
          className="mark-all-button"
        >
          Mark All Completed
        </button>
        <button
          onClick={() => dispatch(deleteAllCompleted())}
          className="delete-all-completed-button"
        >
          Delete All Completed
        </button>
      </div>

      {/* Todo List */}
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;