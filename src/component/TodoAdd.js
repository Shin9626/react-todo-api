import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRef } from 'react';

const MySwal = withReactContent(Swal);
const user = JSON.parse(window.localStorage.getItem('user'));

function TodoAdd({ getList }) {
  const { token } = useAuth();
  const stat = useRef(null);
  const handleAdd = (e) => {
    e.preventDefault();
    const content = document.querySelector('#content').value;

    if(content) {
      const body = { todo: { content } }

      fetch('https://todoo.5xcamp.us/todos', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': token || user?.auth,
        })
      })
        .then(res => {
          stat.current = res.status;
          return res.json()
      })
        .then(() => getList()
      )
        .catch(err => console.log(err.toString())
      )
        .finally(() => {
          MySwal.fire({
            position: 'center',
            icon: stat.current === 201 ? 'success' : 'error',
            title: stat.current === 201 ? '新增成功！' : '新增失敗！請再試一次！',
            showConfirmButton: false,
            timer: 1000,
          })
      })
    } else {
      MySwal.fire({
        position: 'center',
        icon: 'error',
        title: '待辦事項不得為空白！',
        showConfirmButton: true,
      })
    }
  }

  return (
    <div className="inputBox">
      <input type="text" placeholder="請輸入待辦事項" id="content" />
      <a href="#" onClick={handleAdd}>
        <i className="fa fa-plus" />
      </a>
    </div>
  )
}

export default TodoAdd;