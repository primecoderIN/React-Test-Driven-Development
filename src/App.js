import { useState } from "react";
import validator from "validator";
const App = () => {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!validator.isEmail(signupInput?.email)) {
      return setError("The entered email is invalid");
    }
    if (signupInput?.password.length < 6) {
      return setError("The password you entered is less than 6 characters");
    }
    if (signupInput?.password !== signupInput?.confirmPassword) {
      return setError("Password did not match");
    }
  };
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            onChange={handleInputChange}
            value={signupInput.email}
            type="email"
            name="email"
            id="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            onChange={handleInputChange}
            value={signupInput.password}
            type="password"
            name="password"
            id="password"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="confirm-password">
            Confirm password
          </label>
          <input
            onChange={handleInputChange}
            value={signupInput.confirmPassword}
            type="password"
            name="confirmPassword"
            id="confirm-password"
            className="form-control"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
