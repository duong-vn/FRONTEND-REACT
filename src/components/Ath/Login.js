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
      navigate("/");
    } else {
      toast.error(res.EM);
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
          onClick={() => handleOnSubmit(email, password)}
        >
          Login
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
