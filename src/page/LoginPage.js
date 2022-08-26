import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormContext } from '../context/FormContext';
import { useAuth } from '../context/AuthContext';
import Logo from "../component/Logo";
import Inputs from "../component/Inputs";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function LoginPage() {
  const { token, setToken, setUser } = useAuth();
  const { handleSubmit } = useFormContext();
  const navigate = useNavigate();

  useEffect(()=>{
    if(token) {
      navigate('/todo');
    }
  }, [token])

  const onSubmitEvent = ({ email, password }) => {
    const loginData = { user: { email, password }}
    fetch('https://todoo.5xcamp.us/users/sign_in', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => {
        if(res.status === 401) {    
          MySwal.fire(
            '登入失敗',
            'Email 或帳號輸入有誤',
            'error',
          )
          return res.json();
        }

        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: '登入成功',
          showConfirmButton: false,
          timer: 1250
        })
          .then(() => {
            setToken(res.headers.get("authorization"));
            navigate('/todo');
          });

        return res.json();
      }).then((result) => {
        const { email, nickname } = result;
        setUser({ email, nickname });
      })
        .catch(err => {
          console.log(err);
          return MySwal.fire({ title: err.message, }) 
        });
  };

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
              <Inputs.Email />
              <Inputs.Password />
              <Inputs.Submit value="登入"/>
              <Link to="/signup" className="formControls_btnLink">註冊帳號</Link>
            </form>    
          </div>
      </div>
    </div>
  );
}

export default LoginPage;
