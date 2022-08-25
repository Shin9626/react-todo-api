import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import Inputs from "../components/Inputs";

function LoginPage() {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate();

  const onSubmitEvent = ({ email, password }) => {
    const loginData = { user: { email, password }}
    console.log(loginData)
    fetch('https://todoo.5xcamp.us/users/sign_in', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => checkLoginStatus(res))
      .catch(err => alert(err));
  };

  const checkLoginStatus = (res) => {
    if(res.status === 401) {
      alert('登入失敗：電子信箱或帳號輸入有誤！')
    }

    if(res.status === 200) {
      console.log(res.headers)
      alert('登入成功')
      navigate('/todo');
    }
  }

  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer ">
        <Logo />
          <div>
            <form 
              className="formControls"
              onSubmit={handleSubmit(onSubmitEvent)}  
            >
              <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
              <Inputs.Email register={register} errors={errors} />
              <Inputs.LogInPassword register={register} errors={errors} />
              <Inputs.Submit value="登入"/>
              <Link to="/signup" className="formControls_btnLink">註冊帳號</Link>
            </form>    
          </div>
      </div>
    </div>
  );
}

export default LoginPage;
