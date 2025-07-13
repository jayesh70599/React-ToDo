// // src/redux/todoSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async thunk to fetch initial todos
// export const fetchInitialTodos = createAsyncThunk('todos/fetchInitial', async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
//   const data = await response.json();
//   return data.map(todo => ({
//     id: todo.id,
//     text: todo.title,
//     completed: todo.completed,
//   }));
// });

// // Redux Slice
// const todoSlice = createSlice({
//   name: 'todos',
//   initialState: {
//     todos: JSON.parse(localStorage.getItem('todos')) || [],
//     filter: 'all',
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     addTodo: (state, action) => {
//       state.todos.push({
//         id: Date.now(),
//         text: action.payload,
//         completed: false,
//       });
//       localStorage.setItem('todos', JSON.stringify(state.todos));
//     },
//     toggleTodo: (state, action) => {
//       const todo = state.todos.find(todo => todo.id === action.payload);
//       if (todo) {
//         todo.completed = !todo.completed;
//         localStorage.setItem('todos', JSON.stringify(state.todos));
//       }
//     },
//     updateTodo: (state, action) => {
//       const { id, text } = action.payload;
//       const todo = state.todos.find(todo => todo.id === id);
//       if (todo) {
//         todo.text = text;
//         localStorage.setItem('todos', JSON.stringify(state.todos));
//       }
//     },
//     deleteTodo: (state, action) => {
//       state.todos = state.todos.filter(todo => todo.id !== action.payload);
//       localStorage.setItem('todos', JSON.stringify(state.todos));
//     },
//     setFilter: (state, action) => {
//       state.filter = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchInitialTodos.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchInitialTodos.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         if (state.todos.length === 0) {
//           state.todos = action.payload;
//           localStorage.setItem('todos', JSON.stringify(state.todos));
//         }
//       })
//       .addCase(fetchInitialTodos.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addTodo, toggleTodo, updateTodo, deleteTodo, setFilter } = todoSlice.actions;
// export default todoSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch initial todos
export const fetchInitialTodos = createAsyncThunk('todos/fetchInitial', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const data = await response.json();
  return data.map(todo => ({
    id: todo.id,
    text: todo.title,
    completed: todo.completed,
  }));
});

// Redux Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    filter: 'all',
    status: 'idle',
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    markAllCompleted: (state) => {
      state.todos = state.todos.map(todo => ({
        ...todo,
        completed: true,
      }));
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    deleteAllCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInitialTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.todos.length === 0) {
          state.todos = action.payload;
          localStorage.setItem('todos', JSON.stringify(state.todos));
        }
      })
      .addCase(fetchInitialTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addTodo, toggleTodo, updateTodo, deleteTodo, setFilter, markAllCompleted, deleteAllCompleted } = todoSlice.actions;
export default todoSlice.reducer;