import React, { useState, useEffect } from "react";
import axios from "axios";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post("http://localhost:8000/test", {
          username: email,
          password: pass,
        })
        .then((response) => {
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else {
            setLoginStatus(response.data[0].user_name);
          }
        });
      localStorage.setItem("token", response.data.token);
      props.history.push("/dashboard");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  console.log(error);
  useEffect(() => {
    axios.get("http://localhost:8000/message").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
      <h1>{loginStatus}</h1>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};
