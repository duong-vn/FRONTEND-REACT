import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const validateEmail = (e) => {
    return isValidEmail.test(e);
  };

  const handleOnClickLogin = () => {
    toast.success("Login page");
    navigate("/login");
  };

  const handleOnSubmit = async (email, password, username) => {
    if (!validateEmail(email)) {
      toast.error("Email is invalid");
      return;
    }
    let res = await postRegister(email, password, username);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="header-container">
        <div className="welcome">Welcome to Our Application</div>
        <div className="login-section">
          <span>Do you already have an account?</span>
          <button className="btn btn-secondary" onClick={handleOnClickLogin}>
            Login
          </button>
        </div>
      </div>

      <div className="title">Sign Up</div>

      <div className="sign-up-content">
        <div className="form-container">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <span
                className="show-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button
            className="btn btn-primary btn-submit"
            onClick={() => handleOnSubmit(email, password, username)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
