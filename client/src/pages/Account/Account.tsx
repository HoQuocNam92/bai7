import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { useAuth } from "@context/AuthContext";

function Account() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [statusAccount, setStatusAccount] = useState(false);
  const handleStatus = () => {
    setStatusAccount(!statusAccount);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:8080/api/auth/google';

  };
  const Navigation = useNavigate();
  const { userStatus, login, register } = useAuth();
  const handleSignIn = (e) => {
    e.preventDefault();
    login(email, password);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    register(name, email, password);
  };
  if (userStatus) {
    Navigation("/");
  }
  const {
    Account,
    Title,
    Active,
    Container,
    FormContainer,
    SignInContainer,
    SignUpContainer,
    OverlayContainer,
    SocialLink,
    Forgot,
    Ghost,
    Overlay,
    OverlayLeft,
    OverlayRight,
    OverPanel,
  } = styles;
  return (
    <div className={Account}>
      <div
        className={clsx(Container, {
          [Active]: statusAccount,
        })}
      >
        <div className={clsx(FormContainer, SignInContainer)}>
          <form action="#">
            <h1 className={Title}>Sign in</h1>
            <div className={SocialLink}>
              <Link to="#">
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-google-plus-g"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-linkedin-in"></i>
              </Link>
            </div>
            <span>or Use Your Account</span>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Email"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <p className={Forgot}>
              <Link to="/forgot">Forgot your password?</Link>
            </p>
            <button onClick={handleSignIn}>SIGN IN</button>
            <button onClick={handleLoginClick}> SIGN IN WITH GOOGLE </button>
          </form>
        </div>
        <div className={clsx(FormContainer, SignUpContainer)}>
          <form action="#">
            <h1 className={Title}>Create Account</h1>
            <div className={SocialLink}>
              <Link to="#">
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-google-plus-g"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-linkedin-in"></i>
              </Link>
            </div>
            <span>or Use Your Email For Registration</span>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Name"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Email"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />

            <button onClick={handleSignUp}>SIGN UP</button>
          </form>
        </div>
        <div className={clsx(OverlayContainer)}>
          <div className={Overlay}>
            <div className={clsx(OverPanel, OverlayLeft)}>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button onClick={handleStatus} className={Ghost}>
                SIGN In
              </button>
            </div>
            <div className={clsx(OverPanel, OverlayRight)}>
              <h1>Hello, Explorer!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={handleStatus} className={Ghost}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
