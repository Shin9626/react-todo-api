import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import TodoNav from "../component/TodoNav";

function TodoPage() {
  const navigate = useNavigate();
  const { token, setToken, user, setUser } = useAuth();

  useEffect(()=>{
    if(!token) {
      setUser({});
      navigate('/');
    }
  }, [token])

  const handleLogOut = (e) => {
    e.preventDefault();
    setToken(null);
  }
  return (
    <div id="todoListPage" className="bg-half">
      <TodoNav nickname={user.nickname} handleLogOut={handleLogOut}/>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input type="text" placeholder="請輸入待辦事項" />
            <a href="#">
              <i className="fa fa-plus" />
            </a>
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              <li>
                <a href="#" className="active">
                  全部
                </a>
              </li>
              <li>
                <a href="#">待完成</a>
              </li>
              <li>
                <a href="#">已完成</a>
              </li>
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
                <li>
                  <label className="todoList_label">
                    <input
                      className="todoList_input"
                      type="checkbox"
                      value="true"
                    />
                    <span>把冰箱發霉的檸檬拿去丟</span>
                  </label>
                  <a href="#">
                    <i className="fa fa-times" />
                  </a>
                </li>
              </ul>
              <div className="todoList_statistics">
                <p> 5 個已完成項目</p>
                <a href="#">清除已完成項目</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
