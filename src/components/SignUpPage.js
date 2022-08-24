import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Logo from "./Logo";


function SignUpPage() {
  const [password, setPassword] = useState("");
  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmitEvent = ({email, nickname, password}) => {
    const regData = { user: { email, nickname, password }}
    fetch('https://todoo.5xcamp.us/users', {
        method: 'POST',
        body: JSON.stringify(regData),
        headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(result => alert(`${result.message} ${ result.error ?? ""}`))
      .catch(err => alert(err));
  };

  return (
    <div id="signUpPage" className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <Logo />
        <div>
          <form
            className="formControls"
            action="index.html"
            onSubmit={handleSubmit(onSubmitEvent)}
          >
            <h2 className="formControls_txt">註冊帳號</h2>
            <label className="formControls_label" htmlFor="email">
              Email
            </label>
            <input
              className="formControls_input"
              type="text"
              id="email"
              name="email"
              placeholder="請輸入 email"
              {...register("email", {
                required: { value: true, message: "此欄位必填" },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "不符合 Email 規則",
                },
              })}
            />
            <span>{errors.email?.message}</span>
            <label className="formControls_label" htmlFor="name">
              您的暱稱
            </label>
            <input
              className="formControls_input"
              type="text"
              name="name"
              id="name"
              placeholder="請輸入您的暱稱"
              {...register("nickname", {
                required: { value: true, message: "此欄位必填" },
              })}
            />
            <span>{errors.nickname?.message}</span>
            <label className="formControls_label" htmlFor="pwd">
              密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="請輸入密碼"
              value={password}
              {...register("password", {
                onChange: (e) => setPassword(e.target.value),
                required: { value: true, message: "此欄位必填" },
                minLength: { value: 6, message: "密碼至少為 6 碼" },
              })}
            />
            <span>{errors.password?.message}</span>
            <label className="formControls_label" htmlFor="pwd">
              再次輸入密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="pwd2"
              id="pwd2"
              placeholder="請再次輸入密碼"
              {...register("check", {
                validate: (e) => e === password,
              })}
            />
            <span>{errors.check && errors.check.type === "validate" && "密碼不一致"}</span>
            <input
              className="formControls_btnSubmit"
              type="submit"
              value="註冊帳號"
            />
            <a className="formControls_btnLink" href="#loginPage">
              登入
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;