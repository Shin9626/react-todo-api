import './App.css';
import { useState } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';
import TodoPage from './page/TodoPage';

function App() {
  const localUser = JSON.parse(window.localStorage.getItem('user'));
  const [token, setToken] = useState('');
  return (
    <div className="App">
      <AuthContext.Provider value={{ token, setToken, localUser }}>
        <HashRouter>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/todo" element={<TodoPage />}>
              <Route path=":id" element={<TodoPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
