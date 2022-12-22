import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import ReviewForm from "./ReviewForm";
import Review from "./Review";

const Airline = () => {
  const [airline, setAirline] = useState({})

  // Create a state for the review form
  const [review, setReview] = useState({title: '', description: '', score: 0})

  // Set loaded to false to prevent the page from rendering before the data is loaded
  const [loaded, setLoaded] = useState(false)

  // Get the slug from the URL
  let params = useParams()
  const slug = params.slug;
  // Construct the URL
  const url = `/api/v1/airlines/${slug}`

  useEffect(() => {
    // console.log(url);
    axios.get(url)
    .then( resp => {
      // console.log(resp);
      setAirline(resp.data)
      // Set loaded to true to render the page after the data is loaded
      setLoaded(true)
    })
    .catch( resp => console.log(resp) )
  }, [])

  // Create a function to handle the form change
  const handleChange = (e) => {
    e.preventDefault()
    // The next line creates a new object with the same properties as review
    // Then it adds the new property to the object
    // The new property is the name of the input field
    // The value of the new property is the value of the input field
    // And it saves the new object to the review state
    // That way, the review state is always up to date with the form
    // And we can send the review state to the API
    // To create a new review in the database
    const name = e.target.name || ""
    const value = e.target.value || ""

    setReview(Object.assign({}, review, { [name]: value }))
  }

  // Create a function to handle the form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // Get the csrf token from the meta tag
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    // Get the airline id from the airline state
    // That was set when the page loaded from the API call in useEffect
    const airline_id = airline.data.id;

    // Send the review state to the API
    axios.post('/api/v1/reviews', {review, airline_id})
    .then( resp => {
      // Add the new review to the included array in the airline state
      // So that it will be displayed on the page without reloading
      const included = [...airline.included, resp.data.data]

      // Set the airline state to include the new review
      setAirline({...airline, included})

      // Reset the review state to an empty object
      setReview({title: '', description: '', score: 0})
    })
    .catch( resp => console.log(resp) )
  }

  const setRating = (score, e) => {
    e.preventDefault()

    // Set the score in the review state
    setReview({...review, score})
  }

  const reviews = loaded && airline.included ? airline.included.map( (item, index) => {
    return (
      <Review
        key={index}
        attributes={item.attributes}
      />
    )
  } ) : null
  return (
    <div className="wrapper">
      {loaded &&
        <Fragment>
          <div className="column">
            <div className="main">
                <Header
                  attributes={airline.data.attributes}
                  reviews={airline.included}
                />
              {reviews}
            </div>
          </div>
          <div className="column">
            <ReviewForm
              key={airline.data.id}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              attributes={airline.data.attributes}
              review={review}
            />
          </div>
        </Fragment>
      }
    </div>
  )
}


export default Airline;
