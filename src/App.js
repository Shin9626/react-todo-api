import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<LoginPage />}/>
          <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/todo' element={<TodoPage />}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
