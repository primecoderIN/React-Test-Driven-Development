import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SignUpPage from "./SignUpPage";
const onSubmit = jest.fn((e)=> e.preventDefault())
beforeEach(() => render(<SignUpPage onSubmit={onSubmit} />));

const findAndTypeInto = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordElement = screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }

  if (confirmPassword) {
    userEvent.type(confirmPasswordElement, confirmPassword);
  }
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordElement,
  };
};

describe("Checking if Sign up page has all the expected elements", () => {
  test("if header text is present in form", () => {
    expect(
      screen.getByRole("heading", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test("if email input is present in form", () => {
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  });

  test("if password input is present in form", () => {
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("if confirm password input is present in form", () => {
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  test("if sign up button is present in the form", () => {
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });
});

describe("Checking form functionality", () => {
  test("If user is able to type in email field", () => {
    expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("");
    findAndTypeInto({ email: "sanjeev2856@gmail.com" });
    expect(screen.getByRole("textbox", { name: /email/i }).value).toBe(
      "sanjeev2856@gmail.com"
    );
  });

  test("If user is able to type in password field", () => {
    expect(screen.getByLabelText("Password").value).toBe("");
    findAndTypeInto({ password: "sanjeev2856" });
    expect(screen.getByLabelText("Password").value).toBe("sanjeev2856");
  });

  test("If user is able to type in confirm password field", () => {
    expect(screen.getByLabelText(/confirm password/i).value).toBe("");
    findAndTypeInto({ confirmPassword: "sanjeev2856" });
    expect(screen.getByLabelText(/confirm password/i).value).toBe(
      "sanjeev2856"
    );
  });

  test("if sign up button is disabled untill all inputs have been filled", () => {
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();
    findAndTypeInto({
      email: "sanjeev2856@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(screen.getByRole("button", { name: /sign up/i })).not.toBeDisabled();
  });

  test("if sign up button is disabled when password do not match", () => {
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();
    findAndTypeInto({
      email: "sanjeev2856@gmail.com",
      password: "12345678",
      confirmPassword: "12345",
    });
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();
  });
  test("If we are able to call handleSubmit function on sign up button click", ()=> {
    findAndTypeInto({
        email: "sanjeev2856@gmail.com",
        password: "12345678",
        confirmPassword: "12345678",
      });
      screen.debug()
      userEvent.click(screen.getByRole("button", { name: /sign up/i }))
      expect(onSubmit).toHaveBeenCalledWith({
        email: "sanjeev2856@gmail.com",
        password: "12345678",
        confirmPassword: "12345678",  
      })
    
  })
});
