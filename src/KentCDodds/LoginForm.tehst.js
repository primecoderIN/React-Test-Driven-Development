import React from "react";
import { faker } from "@faker-js/faker";
import LoginForm from "./LoginForm";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import {setupServer} from "msw/node"
import { rest } from "msw"

// import {build,fake} from "@jackfranklin/test-data-bot"

// test("Login form testing", ()=> {
//     const username = "primecoder"
//     const password = "123456789"
//     let submittedData;
//     render(<LoginForm onSubmit={(data)=> submittedData=data}/>)
//     userEvent.type(screen.getByLabelText(/username/i),username)
//     userEvent.type(screen.getByLabelText(/password/i),password)
//     userEvent.click(screen.getByRole("button",{name: /submit/i}))
//     screen.debug()
//     expect(submittedData).toEqual({
//         username,
//         password
//     })
// })

//Alternate and better approach with faker js

const getLoginCredentials = (overrides) => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  };
};

test("Login form testing", () => {
  const { username, password } = getLoginCredentials();
  const handleSubmit = jest.fn(); //This is a mock function
  render(<LoginForm onSubmit={handleSubmit} />);
  expect(screen.getByLabelText(/username/i)).toHaveAttribute("type", "text")
  expect(screen.getByLabelText(/password/i)).toHaveAttribute("type", "password")
  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  screen.debug();
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1); //Ensure karo ki ek bar hi call hua hai handle submit
});




  