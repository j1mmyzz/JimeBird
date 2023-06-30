import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export let birds = [
  {
    name: "blue jay",
    color: "blue",
    region: "north america",
  },
  {
    name: "sun conure",
    color: "orange",
    region: "south america",
  },
  {
    name: "house sparrow",
    color: "brown",
    region: "north america",
  },
  {
    name: "bald eagle",
    color: "brown",
    region: "north america",
  },
  {
    name: "cockatiel",
    color: "varies",
    region: "australia",
  },
];
birds.sort((a, b) => a.name.localeCompare(b.name));
function ShowBirdList() {
  return birds.map((bird, i) => (
    <div key={i} className="birdDiv">
      <ul>
        <li>Name: {bird.name}</li>
        <li>Color: {bird.color}</li>
        <li>Region: {bird.region}</li>
      </ul>
    </div>
  ));
}

function BirdCatalog() {
  const [birdName, setBirdName] = useState("");
  const [birdColor, setBirdColor] = useState("");
  const [birdRegion, setBirdRegion] = useState("");

  const handleAddBird = (event) => {
    event.preventDefault();
    const newBird = {
      name: birdName,
      color: birdColor,
      region: birdRegion,
    };
    birds.push(newBird);
    setBirdName("");
    setBirdColor("");
    setBirdRegion("");
    console.log(birds);
  };

  return (
    <div className="back">
      <Link href="/">
        <button className="catalogButton">Back to Search</button>
      </Link>
      <div className="addBird">
        <form onSubmit={handleAddBird}>
          <input
            type="text"
            placeholder="Name"
            value={birdName}
            onChange={(e) => setBirdName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Color"
            value={birdColor}
            onChange={(e) => setBirdColor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Region"
            value={birdRegion}
            onChange={(e) => setBirdRegion(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <ShowBirdList />
    </div>
  );
}

export default BirdCatalog;
