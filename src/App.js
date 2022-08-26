import './App.css';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Route, Routes, HashRouter } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';
import TodoPage from './page/TodoPage';
import { FormContext } from './context/FormContext';
import { AuthContext } from './context/AuthContext';

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const { register, handleSubmit, formState: { errors }} = useForm();
  return (
    <div className="App">
      <FormContext.Provider value={{ register, handleSubmit, errors }}>
      <AuthContext.Provider value={{ token, setToken, user, setUser }}>
        <HashRouter>
          <Routes>
            <Route index element={<LoginPage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
            <Route path='/todo' element={<TodoPage />}/>
          </Routes>
        </HashRouter>
      </AuthContext.Provider>
      </FormContext.Provider>  
    </div>
  );
}

export default App;
