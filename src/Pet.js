import React from "react";

export const Pet = props => {
  return (
    <div>
      <h1>{props.name.toUpperCase()}</h1>
      <h2>{props.animal.toUpperCase()}</h2>
      <h3>{props.breed.toUpperCase()}</h3>
    </div>
  );
};
