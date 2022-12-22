import React, { Fragment } from 'react'

export default function ReviewForm(props) {
  const ratingOptions = [5, 4, 3, 2, 1].map((score, index) => {
      return (
        <Fragment key={`rating-${index}`}>
          <input type='radio'
            value={score}
            name='rating'
            checked={props.review.score == score}
            onChange={() => console.log('selected:', score)} />
          <label onClick={props.setRating.bind(this, score)}></label>
        </Fragment>
      )
    })
  return (
    <div className='form-wrapper'>
      <form onSubmit={props.handleSubmit}>
        <div className='form-headline'> Have an experience with {props.attributes.name}? Share your review</div>
        <div className='form-field'>
          <input onChange={props.handleChange} value={props.review.title} type='text' name='title' placeholder='Review Title' />
        </div>
        <div className='form-field'>
          <input onChange={props.handleChange} value={props.review.description} type='text' name='description' placeholder='Review Description' />
        </div>
        <div className='form-field'>
          <div className='rating-container'>
            <div className='rating-title'>Rating</div>
            <div className='rating-box'>{ratingOptions}</div>
          </div>
        </div>
        <button className='form-submit' type='submit'>Submit your review</button>
      </form>
    </div>
  )
}
