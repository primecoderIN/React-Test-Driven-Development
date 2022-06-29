

// test("renders learn react link", () => {
//   //Rendering the component we want to test
//   render(<App />);

//   //Finding the element to test
//   const linkElement = screen.getByText(/hello/i);

//   //Asseting the expected behaviour
//   expect(linkElement).toBeInTheDocument();
// });

test("Description", () => {}); //Nothing is written inside test block but still it will was

//The only way we will get error is when some error is thrown


//Important points 

// 1. For no match getBY will thorw an error 

// 2. For no match query by will thorw no error

// 2. Both getBY and query by can not be used with async await means we can
//  not render component asynchronously with getBY and queryby

// 4. FindBy thorws and error for no match and can be used for rendering component asynchronously and testing it

// 5. For every match all three will return the Element 

// 6. For multiple matches all three will thorw an error 



// note : getByRole has top most priority and should be preffered

// getByRole > getByLabelText > getByPlaceholderText >getByText priority sequence

// RTL-PHilosophy

// 1. React testing library does not have anything to do with how something has been implemented.

// 2. It does not go into implementation details

// 3. It only focuses on how something will behave and how it should be used

//We will test only the behaviour of our app now the implementation details

//Syntax

// test('Test description to clarify what we are gonna test here', () => {
//     // A callback function where we write out test logic
// });
