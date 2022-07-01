import React from "react";
import Counter from "./Counter";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

// test("Counter increament and decrement without using screen", () => {
//   const { container } = render(<Counter />);
//   const count = container.querySelector("h1");
//   expect(count.textContent).toBe("Count is : 0");
//   const [increament, decrement] = container.querySelectorAll("button");
//   fireEvent.click(increament);
// //   expect(count.textContent).toBe("Count is : 1");
// expect(count).toHaveTextContent("Count is : 1")

//   fireEvent.click(decrement);
// //   expect(count.textContent).toBe("Count is : 0"); For this extend expect is not needed
// expect(count).toHaveTextContent("Count is : 0") // for this extend expect is needed
// });

//The above setup is not cool. What if we reverse the order of buttons or add more buttons in the middle

test("Counter increament and decrement Using Screen", () => {
  render(<Counter />);  //We no longer need container
//   const count = container.firstChild.querySelector("h1");
const count = screen.getByText(/Count is/i) // Here also doing reading the screen 

  expect(count).toHaveTextContent("Count is : 0");
  const decrement = screen.getByRole("button", { name: /decrease/i });
  const increment = screen.getByRole("button", { name: /increase/i });

  userEvent.click(increment);

  expect(count).toHaveTextContent("Count is : 1");

  userEvent.click(decrement);

  expect(count).toHaveTextContent("Count is : 0"); // for this extend expect is needed
});
