import { useState } from "react";

const LoginForm = ({onSubmit}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit =(e)=> {
    e.preventDefault()
    const [username,password]= e.target.elements;
    onSubmit({
      username : username.value,
      password : password.value
    })
  }
  return (
    
    <form onSubmit={handleSubmit}  >
      <label htmlFor="username">Username</label>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        id="username"
        placeholder="Username..."
        value={username}
        name='username'
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        id="password"
        placeholder="Password..."
        value={password}
        name='password'
      />
      <button type="submit" >Submit</button>
    </form>
  );
};

export default LoginForm;
