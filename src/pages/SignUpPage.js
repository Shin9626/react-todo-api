import { useState, createContext } from "react"; 
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import Inputs from "../components/Inputs";

export const DataContext = createContext();

function SignUpPage() {
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmitEvent = ({ email, nickname, password }) => {
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
        <DataContext.Provider value={{password, setPassword}}>
          <div>
            <form
              className="formControls"
              onSubmit={handleSubmit(onSubmitEvent)}
            >
              <h2 className="formControls_txt">註冊帳號</h2>
              <Inputs.Email register={register} errors={errors} />
              <Inputs.Nickname register={register} errors={errors} />
              <Inputs.SignUpPassword register={register} errors={errors} />
              <Inputs.Check register={register} errors={errors} />
              <Inputs.Submit value="註冊帳號"/>
              <Link to="../" className="formControls_btnLink">登入</Link>
            </form>
          </div>
        </DataContext.Provider>
      </div>
    </div>
  );
}

export default SignUpPage;