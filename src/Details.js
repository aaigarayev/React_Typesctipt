import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";

// Keys that used in .env file
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    // Fetching single pet and passing id as a parameter
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }

        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch(() => {
        // Once there is an error, it will prompt a user to the main page (navigate is taken from reach/router)
        navigate("/");
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const { name, animal, breed, location, description } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
