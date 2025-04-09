import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async (email, password) => {
    let res = await postLogin(email, password);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="login-container">
      <div className="login-header">
        <span> Don't have an account yet?</span>
        <button className="btn-signup" onClick={() => navigate("/sign-up")}>
          Sign up
        </button>
      </div>
      <div className="title mx-auto col-3 ">
        <h1>Login Page</h1>
      </div>
      <div className="welcome mx-auto col-3">
        Please enter your credentials to login.
      </div>

      <div className="content-form mx-auto col-3">
        <div className="form-group ">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="forgot-password">
          <span>Forgot password?</span>
        </div>
        <div>
          <button
            className="btn btn-primary btn-submit"
            onClick={() => handleOnSubmit(email, password)}
          >
            Login
          </button>
        </div>
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
