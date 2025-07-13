// src/App.jsx
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TodoList from './components/TodoList';

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
