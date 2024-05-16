import React, { useState } from "react";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    name: "",
    email: "",
    username: "",
    pass: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    pass: "",
  });

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    if (fieldName === "fname") {
      setLoginForm({
        ...loginForm,
        name: fieldValue,
      });
    }
    if (fieldName === "useremail") {
      setLoginForm({
        ...loginForm,
        email: fieldValue,
      });
    }

    if (fieldName === "username") {
      setLoginForm({
        ...loginForm,
        username: fieldValue,
      });
      if (fieldValue.includes(" ")) {
        setErrors({
          ...errors,
          username: "Username should not contain spaces",
        });
      } else {
        setErrors({
          ...errors,
          username: "",
        });
      }
    }
    if (fieldName === "userpass") {
      setLoginForm({
        ...loginForm,
        pass: fieldValue,
      });
      if (fieldValue.length < 8 || !validatePassword(fieldValue)) {
        setErrors({
          ...errors,
          pass: "Password must be at least 8 characters long and contain at least one lowercase, one uppercase, one digit, and one special character",
        });
      } else {
        setErrors({
          ...errors,
          pass: "",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errors.username && !errors.pass) {
      console.log("Form submitted successfully!", loginForm);
    } else {
      console.log("Form has errors!");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="loginForm my-5 py-5 px-4 rounded-2 w-50 m-auto"
            style={{ border: "1px solid black" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fname" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="fname"
                  className="form-control"
                  id="fname"
                  value={loginForm.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="useremail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="useremail"
                  className="form-control"
                  id="useremail"
                  value={loginForm.email}
                  onChange={handleInputChange}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  value={loginForm.username}
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <div className="text-danger">{errors.username}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="userpass" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="userpass"
                  className="form-control"
                  id="userpass"
                  value={loginForm.pass}
                  onChange={handleInputChange}
                />
                {errors.pass && (
                  <div className="text-danger">{errors.pass}</div>
                )}
              </div>
              <button type="submit" className="btn btn-warning">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
