import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import TodoPage from './components/TodoPage';

function App() {
  return (
    <div className="App">
      <SignUpPage />
    </div>
  );
}

export default App;
