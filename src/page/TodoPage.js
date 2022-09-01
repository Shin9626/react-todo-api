import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TodoNav from '../component/TodoNav';
import TodoAdd from '../component/TodoAdd';
import List from '../component/List';

function TodoPage() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const { token, setToken } = useAuth();
  const user = JSON.parse(window.localStorage.getItem('user'));

  const getList = async () => {
    console.log('get');
    await fetch('https://todoo.5xcamp.us/todos', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: token || user?.auth,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === '未授權') {
          navigate('../');
          window.localStorage.clear();
        } else {
          setList(result.todos);
        }
      })
      .catch((err) => console.log(err.toString()));
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    await window.localStorage.clear();
    setToken(null);
    navigate('/');
    window.localStorage.clear();
    navigate('../');
  };

  useEffect(() => {
    if (!token && !user?.auth) {
      navigate('../');
    } else {
      getList();
    }
  }, []);

  return (
    <div id="todoListPage" className="bg-half">
      <TodoNav nickname={user?.nickname} handleLogOut={handleLogOut} />
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <TodoAdd getList={getList} />
          <List list={list} getList={getList} />
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
