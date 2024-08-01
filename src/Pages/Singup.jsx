import React, { useState } from "react";
import { Header } from "../Component/Header";
import { toast } from 'react-toastify';

export const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    if (!email.includes("@")) {
      return "Email is missing an '@' symbol.";
    }
    if (!email.includes(".")) {
      return "Email is missing a domain (e.g., '.com').";
    }
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(email)) {
      return "Invalid email format.";
    }
    return "";
  };

  const onToast = (s) => {
    if (s === 'Signup Successful!') {
      toast.success(s, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(s, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailValidationMessage = validateEmail(user.email);
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);
      onToast(emailValidationMessage);
      return;
    }

    if (user.password !== user.confirmPassword) {
      onToast("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:9090/auth/singup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.status === 200) {
        onToast("Signup Successful!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        onToast("Something went wrong!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      onToast("Network error, please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex flex-column justify-content-center" id="login-box">
        <div className="login-box-header">
          <h4
            style={{
              color: "rgb(139,139,139)",
              marginBottom: 0,
              fontWeight: 400,
              fontSize: 27,
            }}
          >
            Create an Account
          </h4>
        </div>
        <div className="d-flex flex-row align-items-center login-box-seperator-container">
          <div className="login-box-seperator" />
          <div className="login-box-seperator-text">
            <p
              style={{
                marginBottom: 0,
                paddingLeft: 10,
                paddingRight: 10,
                fontWeight: 400,
                color: "rgb(201,201,201)",
              }}
            >
              or
            </p>
          </div>
          <div className="login-box-seperator" />
        </div>
        <div className="email-login" style={{ backgroundColor: "#ffffff" }}>
          <input
            type="text"
            className="email-input form-control"
            style={{ marginTop: 10 }}
            required=""
            placeholder="Name"
            name="name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
            minLength={3}
          />
          <input
            type="email"
            className="email-input form-control"
            style={{ marginTop: 10 }}
            required=""
            placeholder="Email"
            name="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
              setEmailError("");
            }}
            value={user.email}
            minLength={6}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <input
            type="password"
            className="password-input form-control"
            style={{ marginTop: 10 }}
            required=""
            placeholder="Password"
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
            minLength={6}
          />
          <input
            type="password"
            className="password-input form-control"
            style={{ marginTop: 10 }}
            required=""
            placeholder="Confirm Password"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            value={user.confirmPassword}
            name="confirmPassword"
            minLength={6}
          />
        </div>
        <div className="submit-row" style={{ marginBottom: 0, paddingTop: 0 }}>
          <button
            className="btn btn-primary d-block box-shadow w-100"
            id="submit-id-submit"
            type="submit"
            onClick={(e) => handleSignup(e)}
          >
            Sign Up
          </button>
          <div className="d-flex justify-content-between">
            <div
              className="form-check form-check-inline"
              id="form-check-rememberMe"
            ></div>
            <a id="forgot-password-link" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <div
          id="login-box-footer"
          style={{ padding: "10px 20px", paddingBottom: 23, paddingTop: 5 }}
        >
          <p style={{ marginBottom: 0 }}>
            Already have an account?
            <a id="register-link" href="/login">
              Sign In!
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
