import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Airline from "./Airline";


const Airlines = () => {
  const [airlines, setAirlines] = useState([])

  // Second argument to useEffect is an array of dependencies
  // If the array is empty, the effect will only run once
  // If the array has a value, the effect will run every time the value changes
  useEffect(() => {
    // Get airlines from API
    // Set airlines to state
    // yarn add axios
    axios.get('/api/v1/airlines.json')
    .then( resp => {
      setAirlines(resp.data.data)
    } )
    .catch( resp => console.log(resp) )
  }, [airlines.length])

  // Map over airlines and return a Airline component for each
  // Pass in the attributes of each airline as props
  // Works like a render partial in Rails
  const grid = airlines.map( item => {
    return (
      <Airline
        key={item.attributes.name}
        attributes={item.attributes}
      />
      )
  })

  return (
    <div className="home">
      <div className="header">
        <h1>Open flights</h1>
        <div className="subheader">Honest, unbiased airline reviews.</div>
      </div>
      <div className="grid">
        {grid}
      </div>
    </div>
)}


export default Airlines
