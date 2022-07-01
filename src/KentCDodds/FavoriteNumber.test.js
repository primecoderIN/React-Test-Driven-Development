import React from "react"; 
import userEvent from "@testing-library/user-event";
import {  render, screen } from "@testing-library/react";
import FavoriteNumber from "./FavoriteNumber";

beforeEach(()=> render(<FavoriteNumber />));

test("if input of type number is present in the component", () => {
  expect(screen.getByLabelText(/favorite number/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/favorite number/i)).toHaveAttribute(
    "type",
    "number"
  );
});

test("if error message is shown when input in invalid",() => { 
  expect(screen.queryByRole("alert")).toBeNull()
  userEvent.type(screen.getByLabelText(/favorite number/i), "10");
  expect(screen.getByRole("alert")).toHaveTextContent(/the number is invalid/i);
});
