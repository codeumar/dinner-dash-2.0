import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/auth/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.auth == false) {
            setError("Not user found");
            return;
          }
          if (res.status === 200) {
            console.log(res.headers.token);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.userdata));
            if (res.data.userdata.role == "user") navigate("/");
            if (res.data.userdata.role == "admin")
              navigate(`/dashboard/${res.data.userdata.userid}`);
          } else {
            setError("Incorrect password");
          }
        });
    } catch (error) {
      if (error.response && error.response.status == 404) {
        setError("Email or Password are not correct");
      } else {
        setError("User Does not exists");
      }
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8">
          <h2 className="text-center mb-4">Login</h2>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
