import { useState, useReducer, useEffect } from "react";
import React from "react"

const formSubmissionReducer = (state, action) => {
  switch (action.type) {
    case "START": {
      return { status: "pending", responseData: null, errorMessage: null };
    }
    case "RESOLVE": {
      return {
        status: "resolved",
        responseData: action.responseData,
        errorMessage: null,
      };
    }
    case "REJECT": {
      return {
        status: "rejected",
        responseData: null,
        errorMessage: action.error.message,
      };
    }
    default : {
        return state;
    }
  }
};

const useFormSubmission = ({ endpoint, data }) => {
  const [state, dispatch] = useReducer(formSubmissionReducer, {
    status: "idle",
    responseData: null,
    errorMessage: null,
  });

  const fetchbody = data ? JSON.stringify(data) : null;
  useEffect(() => {
    if (fetchbody) {
      dispatch({ type: "START" });
      window.fetch(endpoint, {
        method: "POST",
        body: fetchbody,
        headers: {
          "content-type": "application/json",
        },
      }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "RESOLVE", responseData: data });
        } else {
          dispatch({ type: "REJECT", error: data });
        }
      });
    }
  
  }, [fetchbody, endpoint]);
  return state;
};

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const [username, password] = e.target.elements;
    onSubmit({
      username: username.value,
      password: password.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        id="username"
        placeholder="Username..."
        value={username}
        name="username"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        id="password"
        placeholder="Password..."
        value={password}
        name="password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};



export const LoginSubmission = () => {
  const [formData, setFormData] = useState(null);

  const { status, responseData, errorMessage } = useFormSubmission({
    endpoint: "localhost:3000/api",
    data: formData,
  });

  return (
    <>
      {status === "resolved" ? (
        <div>
          Welcome <strong>{responseData.username}</strong>
        </div>
      ) : (
        <LoginForm onSubmit={(data) => setFormData(data)} />
      )}
      <div style={{ height: "200px" }}>
        {status === "pending" ? <h1>Loading</h1> : null}
        {status === "rejected" ? <h1>{errorMessage}</h1> : null}
      </div>
    </>
  );
};

