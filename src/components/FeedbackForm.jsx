import { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

const FeedbackForm = ({ handleAdd }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const handleTextChange = (e) => {
    let inputText = e.target.value;

    if (inputText === '') {
      setBtnDisabled(true);
      setMessage('');
    } else if (inputText !== '' && inputText.trim().length < 10) {
      setBtnDisabled(true);
      setMessage('Text must be at least 10 characters.');
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }

    setText(inputText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length >= 10) {
      const newFeedback = {
        text,
        rating,
      };
      handleAdd(newFeedback);
      setText('');
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2> How would you are your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            type='text'
            onChange={handleTextChange}
            placeholder='Write a review'
            value={text}
          />

          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'> {message} </div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
