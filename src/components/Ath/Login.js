import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner5 } from "react-icons/im";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateEmail = (e) => {
    return isValidEmail.test(e);
  };
  const handleOnSubmit = async (email, password) => {
    if (!validateEmail(email)) {
      toast.error("Email is invalid");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    setIsLoading(true);

    let res = await postLogin(email, password);
    if (res && +res.EC === 0) {
      dispatch(doLogin(res));

      toast.success(res.EM);
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(res.EM);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="welcome">Welcome to Our Application</div>
        <div className="signup-section">
          <span>Don't have an account yet?</span>
          <button className="btn-signup" onClick={() => navigate("/sign-up")}>
            Sign up
          </button>
        </div>
      </div>

      <div className="title">
        <h1>Login Page</h1>
      </div>

      <div className="content-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={"password"}
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="forgot-password">
          <span>Forgot password?</span>
        </div>
        <button
          className="btn btn-primary btn-submit"
          onClick={() => {
            setTimeout(() => {
              setIsLoading(false);
            }, 5000);
            handleOnSubmit(email, password);
          }}
          disabled={isLoading}
        >
          {isLoading === true && <ImSpinner5 className="loaderIcon" />}

          <span>Login</span>
        </button>
        <div className="text-center">
          <span className="back" onClick={() => navigate("/")}>
            &#60;&#60;&#160;Go to HomePage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
