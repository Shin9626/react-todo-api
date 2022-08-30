import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from '../context/AuthContext';

const user = JSON.parse(window.localStorage.getItem('user'));
const MySwal = withReactContent(Swal);

function Item({ item, getList }) {
  const { token } = useAuth();
  const stat = useRef(null);

  const handleItemToggle = async (e) => {
    e.target.setAttribute('disabled', true);
    await fetch(`https://todoo.5xcamp.us/todos/${item.id}/toggle`, {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: token || user?.auth,
      }),
    })
      .then((res) => stat.current = res.status)
      .catch((err) => console.log(err.toString()))
      .finally(() => getList());

    e.target.removeAttribute('disabled');

    MySwal.fire({
      toast: true,
      position: 'top-end',
      icon: stat.current === 200 ? 'success' : 'error',
      title: `狀態切換${stat.current === 200 ? '成功' : '失敗'}`,
      showConfirmButton: false,
      timer: 1250,
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`https://todoo.5xcamp.us/todos/${item.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: token || user?.auth,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: `${result.message}`,
          showConfirmButton: false,
          timer: 1250,
        });
      })
      .catch((err) => console.log(err.toString()))
      .finally(() => getList());
  };

  return (
    <li>
      <label className="todoList_label">
        <input
          className="todoList_input"
          type="checkbox"
          checked={item.completed_at && 'checked'}
          onChange={(e) => handleItemToggle(e)}
        />
        <span>{item.content}</span>
      </label>
      <a href="#" onClick={handleDelete}>
        <i className="fa fa-times" />
      </a>
    </li>
  );
}

function ItemFilter({ list, tabState, getList }) {
  let newList = [];

  switch (tabState) {
    case '待完成': {
      newList = list.filter((item) => !item.completed_at);
      break;
    }
    case '已完成': {
      newList = list.filter((item) => item.completed_at);
      break;
    } default: newList = list;
  }

  return (
    <ul className="todoList_item">
      { newList.map((item) => <Item key={item.id} item={item} getList={getList} />) }
    </ul>
  );
}

function ListTab({ tabState, setTabState }) {
  const tabList = ['全部', '待完成', '已完成'];
  const handleTabChange = (e) => {
    e.preventDefault();
    setTabState(e.target.innerText);
  };

  return (
    <ul className="todoList_tab">
      {
        tabList.map((tab, i) => (
          <li key={i}>
            <a
              href="*"
              onClick={(e) => handleTabChange(e)}
              className={tab === tabState ? 'active' : ''}
            >
              {' '}
              {tab}
            </a>
          </li>
        ))
      }
    </ul>
  );
}

function List({ list, getList }) {
  const { token } = useAuth();
  const [ tabState, setTabState ] = useState('全部');

  const handleDeleteCompleted = async (e) => {
    e.preventDefault();
    await list.filter((item) => {
        if (item.completed_at) {
          fetch(`https://todoo.5xcamp.us/todos/${item.id}`, {
            method: 'DELETE',
            headers: new Headers({
              'Content-Type': 'application/json',
              authorization: token || user?.auth,
            }),
          })
            .then((res) => res.json()
          )
            .catch((err) => console.log(err.toString()));
        }
    })

    getList().then(() => {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: '刪除成功',
        showConfirmButton: false,
        timer: 1250,
      });
    })   
  };

  return (
    <div className="todoList_list">
      <ListTab tabState={tabState} setTabState={setTabState} />
      <div className="todoList_items">
        {
          list.length
            ? <ItemFilter list={list} tabState={tabState} getList={getList} />
            : <div className="Nothing">暫無代辦項目</div>
        }
        <div className="todoList_statistics">
          <p>
            {list.filter((item) => !item.completed_at).length}
            {' '}
            個待完成項目
          </p>
          <a href="#" onClick={(e) => handleDeleteCompleted(e)}>清除已完成項目</a>
        </div>
      </div>
    </div>
  );
}

export default List;
