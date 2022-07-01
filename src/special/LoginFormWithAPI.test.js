import React from "react";
import { faker } from "@faker-js/faker";
import { LoginSubmission } from "./LoginFormWithAPI";
import userEvent from "@testing-library/user-event"; 
import { render, screen ,waitForElementToBeRemoved} from "@testing-library/react";
import {setupServer} from "msw/node"
import { rest } from "msw"




const getLoginCredentials = (overrides) => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  };
};

const handlers = [
    rest.post("localhost:3000/api", async (req,res,contextObj)=> {
        return res(contextObj.json({username: req.body.username}))
    }
)]

const server = setupServer(...handlers)


beforeAll(()=> server.listen()) 
afterAll(()=> server.close())


test("Login form testing",async () => {
  const { username, password } = getLoginCredentials();
 
  render(<LoginSubmission/>);
  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole("button", { name: /submit/i }));


  screen.debug()
});




  