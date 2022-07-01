import { useState } from "react";
const SignUpPage = ({onSubmit}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e)=> {
    e.preventDefault()
    onSubmit({
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword
    })
  }
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={user.email}
          placeholder="Email..."
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          placeholder="Password..."
          onChange={handleInputChange}
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="confirmPassword"
          id="confirmPassword"
          name="confirmPassword"
          value={user.confirmPassword}
          placeholder="Confirm password..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={
            !user.email ||
            !user.password ||
            !user.confirmPassword ||
            user.password !== user.confirmPassword
          }
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
