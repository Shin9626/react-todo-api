import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { FormContext } from '../context/FormContext';
import Logo from '../component/Logo';
import Inputs from '../component/Inputs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function SignUpPage() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitEvent = ({ email, nickname, password }) => {
    const regData = { user: { email, nickname, password } };
    const user = {};
    fetch('https://todoo.5xcamp.us/users', {
      method: 'POST',
      body: JSON.stringify(regData),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          const auth = res.headers.get('authorization');
          setToken(auth);
          user.auth = auth;
        }
        return res.json();
      })
      .then((result) => {
        MySwal.fire({
          position: 'center',
          icon: `${result.error ? 'error' : 'success'}`,
          title: `${result.message} </br> ${result.error?.join() || ''}`,
          showConfirmButton: true,
        }).then(() => {
          if (!result.error) {
            user.nickname = result.nickname;
            window.localStorage.setItem('user', JSON.stringify(user));
            navigate('/todo');
          }
        });
      })
      .catch((err) => alert(err))
      .finally(() => reset());
  };

  return (
    <div id="signUpPage" className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <Logo />
        <div>
          <FormContext.Provider value={{ register, errors }}>
            <form
              className="formControls"
              onSubmit={handleSubmit(onSubmitEvent)}
            >
              <h2 className="formControls_txt">註冊帳號</h2>
              <Inputs.Email />
              <Inputs.Nickname />
              <Inputs.Password />
              <Inputs.Check />
              <Inputs.Submit value="註冊帳號" />
              <Link to="../" className="formControls_btnLink">
                登入
              </Link>
            </form>
          </FormContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
