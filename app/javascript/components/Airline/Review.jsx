import React from 'react'
import Rating from '../Rating/Rating'

const Review = (props) => {

  const { title, description, score } = props.attributes

  return (
    <div className='review-card'>
      <div className='review-rating-container'>
        <Rating score={score} />
      </div>
      <div className='review-title'>{title}</div>
      <div className='review-description'>{description}</div>
    </div>
  )
}

export default Review
