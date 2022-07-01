import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<LoginForm />);
}); //Render app for each test

//helper function to find element and type into it

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

const clickSubmitButton = () => {
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
};

test("Inputs should initially be empty", () => {
  expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("");
  expect(screen.getByLabelText("Password").value).toBe("");
  expect(screen.getByLabelText(/confirm password/i).value).toBe("");
});

describe("Should be able to type in input fields", () => {

    //We can call beforeEach afterEach etc inside describe blocks to do someting for a particular set of tests
  test("Should be able to type in email field", () => {
    const { emailInputElement } = findAndTypeInto({
      email: "sanjeev2856@gmail.com",
    });
    expect(emailInputElement.value).toBe("sanjeev2856@gmail.com");
  });

  test("Should be able to type in password field", () => {
    const { passwordInputElement } = findAndTypeInto({ password: "12345" });
    expect(passwordInputElement.value).toBe("12345");
  });

  test("Should be able to type in confirm password field", () => {
    const { confirmPasswordElement } = findAndTypeInto({
      confirmPassword: "12345",
    });
    expect(confirmPasswordElement.value).toBe("12345");
  });
});

describe("Form error handling", () => {
  test("Should show an error message when user enters invalid email", () => {
    expect(
      screen.queryByText(/the entered email is invalid/i)
    ).not.toBeInTheDocument();

    findAndTypeInto({ email: "hello.com" });

    clickSubmitButton();

    expect(
      screen.getByText(/the entered email is invalid/i)
    ).toBeInTheDocument();
  });

  test("Should show an error message if password entered is less than 6 characters", () => {
    findAndTypeInto({ email: "sanjeev2856@gmail.com" });

    expect(
      screen.queryByText(
        /the password you entered is less than six characters/i
      )
    ).not.toBeInTheDocument();

    findAndTypeInto({ password: "123" });

    clickSubmitButton();

    expect(
      screen.getByText(/the password you entered is less than 6 characters/i)
    ).toBeInTheDocument();
  });

  test("Check if error is shown when password does not match", () => {
    expect(
      screen.queryByText(/password did not match/i)
    ).not.toBeInTheDocument();

    findAndTypeInto({ email: "sanjeev2856@gmail.com" });
    findAndTypeInto({ password: "8465738" });
    findAndTypeInto({ confirmPassword: "8386238649" });

    clickSubmitButton();
    expect(screen.getByText(/password did not match/i)).toBeInTheDocument();
  });

  test("Should show no error message if every input is correct", () => {
    findAndTypeInto({ email: "sanjeev2856@gmail.com" });
    findAndTypeInto({ password: "9582079478" });
    findAndTypeInto({ confirmPassword: "9582079478" });
    clickSubmitButton();
    expect(
      screen.queryByText(/the entered email is invalid/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /the password you entered is less than six characters/i
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password did not match/i)
    ).not.toBeInTheDocument();
  });
});
