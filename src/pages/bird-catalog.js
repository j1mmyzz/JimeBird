import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function BirdCatalog() {
  const [birds, setBirds] = useState([]);
  const [birdName, setBirdName] = useState("");
  const [birdColor, setBirdColor] = useState("");
  const [birdRegion, setBirdRegion] = useState("");

  useEffect(() => {
    const fetchBirds = async () => {
      const querySnapshot = await getDocs(collection(db, "birds"));
      const birdList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBirds(birdList);
    };

    fetchBirds();
  }, []);

  //add a new bird to Firestore
  const handleAddBird = async (event) => {
    event.preventDefault();

    if (!birdName || !birdColor || !birdRegion) {
      alert("Please fill in all fields.");
      return;
    }

    const newBird = {
      name: birdName.toLowerCase(),
      color: birdColor,
      region: birdRegion,
    };

    try {
      const docRef = await addDoc(collection(db, "birds"), newBird);
      setBirds([...birds, { id: docRef.id, ...newBird }]); // Update UI immediately
      setBirdName("");
      setBirdColor("");
      setBirdRegion("");
    } catch (error) {
      console.error("Error adding bird: ", error);
    }
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

      {birds.map((bird) => (
        <div key={bird.id} className="birdDiv">
          <ul>
            <li>Name: {bird.name}</li>
            <li>Color: {bird.color}</li>
            <li>Region: {bird.region}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default BirdCatalog;
