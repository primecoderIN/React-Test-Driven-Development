import { useState } from "react";

const FavoriteNumber = ({ min = 1, max = 9 }) => {
  const [number, setNumber] = useState(0);
  const [numberEntered, setNumberEntered] = useState(false);

  const handleInputChange = (e) => {
    setNumber(e.target.value);
    console.log(e.target.value)
    setNumberEntered(true);
  };
 console.log("Number", typeof(number))
  const isValid = !numberEntered || (number >= min && number <= max);
  console.log("IsValid", isValid)
  return (
    <div>
      <label htmlFor="favoriteNumber">Favorite Number</label>
      <input
        id="favoriteNumber"
        type="number"
        onChange={handleInputChange}
        value={number}
      />
      {isValid? null : <p role="alert"> The number is invalid</p>}
    </div>
  );
};

export default FavoriteNumber;
