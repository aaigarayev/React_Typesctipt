import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import { Pet } from "./Pet";

// Keys that used in .env file
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    petfinder.pet
      .find({ output: "full", location: "Seattle, WA" })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          pets: pets
        });
      });
  }

  render() {
    // Render out to the DOM all of the state got from API
    // <pre><code>{JSON.stringify(this.state, null, 4)}</code></pre>
    return (
      <React.Fragment>
        <h1>Adopt me!</h1>
        <div>
          {this.state.pets.map(pet => {
            let breed;

            if (Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(", ");
            } else {
              breed = pet.breeds.breed;
            }
            return <Pet animal={pet.animal} name={pet.name} breed={breed} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
