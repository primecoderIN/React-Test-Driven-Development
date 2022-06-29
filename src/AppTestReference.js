import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/user-event";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("Inputs should initially be empty", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordElement = screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordElement.value).toBe("");
});

test("Should be able to type in email field", () => {
  render(<App />);
  const emailInputField = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(emailInputField, "sanjeev2856@gmail.com");
  expect(emailInputField.value).toBe("sanjeev2856@gmail.com");
});
test("Should be able to type in password field", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "12345");
  expect(passwordInputElement.value).toBe("12345");
});

test("Should be able to type in confirm password field", () => {
  render(<App />);
  const confirmPasswordElement = screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordElement, "12345");
  expect(confirmPasswordElement.value).toBe("12345");
});

test("Should show an error message when user enters invalid email", () => {
  render(<App />);
  const emailInvalidErrorText = screen.queryByText(
    /the entered email is invalid/i
  );
  expect(emailInvalidErrorText).not.toBeInTheDocument();
  const emailInputField = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(emailInputField, "hello.com");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
  const invalidErrorElement = screen.getByText(/the entered email is invalid/i);
  expect(invalidErrorElement).toBeInTheDocument();
});

test("Should show an error message if password entered is less than 6 characters", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.type(emailInputElement, "sanjeev2856@gmail.com");
  const passwordErrorElement = screen.queryByText(
    /the password you entered is less than six characters/i
  );
  expect(passwordErrorElement).not.toBeInTheDocument();
  userEvent.type(passwordInputElement, "123");

  userEvent.click(submitButton);
  const passwordErrorElementAgain = screen.getByText(
    /the password you entered is less than 6 characters/i
  );
  expect(passwordErrorElementAgain).toBeInTheDocument();
})

test("Check if error is shown when password does not match", ()=> {
    render(<App/>)
    const passwordMatchErr = screen.queryByText(/password did not match/i)
    expect(passwordMatchErr).not.toBeInTheDocument()
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordElement = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.type(emailInputElement, "sanjeev2856@gmail.com")
    userEvent.type(passwordInputElement, "1234567")
    userEvent.type(confirmPasswordElement, "12348745")
    userEvent.click(submitButton)
    const passwordMatchErrAgain = screen.getByText(/password did not match/i)
    expect(passwordMatchErrAgain).toBeInTheDocument()


})

test("Should show no error message if every input is correct", ()=> {
    render(<App/>)
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordElement = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });
   
    userEvent.type(emailInputElement, "sanjeev2856@gmail.com")
    userEvent.type(passwordInputElement, "9582079478")
    userEvent.type(confirmPasswordElement,"9582079478")
    userEvent.click(submitButton)
    const emailErrorAfter = screen.queryByText(
        /the entered email is invalid/i
      );
    const passwordLengthErrorAfter = screen.queryByText(
        /the password you entered is less than six characters/i
      );
    const passwordMatchErrAfter = screen.queryByText(/password did not match/i)
    expect(emailErrorAfter).not.toBeInTheDocument()
    expect(passwordLengthErrorAfter).not.toBeInTheDocument()
    expect(passwordMatchErrAfter).not.toBeInTheDocument()
    screen.debug()
})
