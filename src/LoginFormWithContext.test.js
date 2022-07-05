import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./contexts/AuthContext";

const onSubmit =  jest.fn()
beforeAll(() => {
  render(
    <AuthProvider>
      <LoginForm onSubmit={onSubmit} />
    </AuthProvider>
  );
});

test("Checking form fields", ()=> {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    userEvent.type(screen.getByLabelText(/username/i),"sanjeev2856")
    userEvent.type(screen.getByLabelText(/password/i),"2856")
    screen.debug()
    userEvent.click(screen.getByRole("button", {name: /submit/i}))
    expect(onSubmit).toHaveBeenCalledWith({username: "sanjeev2856",password: "2856"})
})
