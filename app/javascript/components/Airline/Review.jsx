import React from 'react'

const Review = (props) => {

  const { title, description, score } = props.attributes

  return (
    <div className='review-card'>
      <div className='review-rating-container'>
        <div className='rating-score'>{score}</div>
      </div>
      <div className='review-title'>{title}</div>
      <div className='review-description'>{description}</div>
    </div>
  )
}

export default Review
