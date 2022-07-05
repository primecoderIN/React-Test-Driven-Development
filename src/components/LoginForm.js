import { useAuthContext } from "../contexts/AuthContext"


const LoginForm = ({onSubmit=()=> console.log("Login form")}) => {
    const {username,password,handleInputChange} = useAuthContext()
    const handleSubmit = (e)=> {
        e.preventDefault()
        onSubmit({username,password})
    }
  return (
    <div className="container my-5">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          onChange={handleInputChange}
          value={username}
          type="text"
          name="username"
          id="username"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          onChange={handleInputChange}
          value={password}
          type="password"
          name="password"
          id="password"
          className="form-control"
        />
      </div>
  

      <button
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  </div>
  )
}

export default LoginForm