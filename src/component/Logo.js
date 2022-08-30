function Logo() {
  return (
    <div className="side">
      <a href="#">
        <img
          className="logoImg"
          src={process.env.PUBLIC_URL +"/img/logo_ONLINE_TODO_LIST.png"}
          alt=""
        />
      </a>
      <img
        className="d-m-n"
        src={process.env.PUBLIC_URL + "/img/logo_TODO_GRAPHIC.png"}
        alt="workImg"
      />
    </div>
  );
}

export default Logo;
