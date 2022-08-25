import { useContext } from "react";
import { DataContext } from "../pages/SignUpPage";

const Inputs = {

  Email: ({ register, errors }) => {
    return (
      <>
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
      </>
    )
  },
  LogInPassword: ({ register, errors }) => {
    return (
      <>
        <label className="formControls_label" htmlFor="pwd">
          密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          name="pwd"
          id="pwd"
          placeholder="請輸入密碼"
          {...register("password", {
            required: { value: true, message: "此欄位必填" },
            minLength: { value: 6, message: "密碼至少為 6 碼" },
          })}
        />
        <span>{errors.password?.message}</span>
      </>
    )
  },
  SignUpPassword: ({ register, errors }) => {
    const { password, setPassword } = useContext(DataContext);
    return (
      <>
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
      </>
    )
  },
  Check: ({ register, errors } ) => {
    const { password } = useContext(DataContext)
    return (
      <>
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
            validate: (e) =>  e === password ,
          })}
        />
        <span>{errors.check && errors.check.type === "validate" && "密碼不一致"}</span>
      </>
    )
  },
  Nickname: ({ register, errors } ) => {
    return (
      <>
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
      </>
    )
  },
  Submit: ({ value }) => {
    return (
      <input
        className="formControls_btnSubmit"
        type="submit"
        value={ value }
      />
    )
  }
}

export default Inputs;
