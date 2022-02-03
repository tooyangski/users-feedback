import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './data/FeedbackData';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './pages/AboutPage';

const App = () => {
  const [feedback, setFeedbackData] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm('Arey you sure you want to delete?')) {
      const filterdedFeedback = feedback.filter((item) => item.id !== id);
      setFeedbackData(filterdedFeedback);
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedbackData([newFeedback, ...feedback]);
  };

  return (
    <Router>
      <Header text='Users Feedback' />
      <div className='container'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList
                  feedback={feedback}
                  handleDelete={deleteFeedback}
                />
              </>
            }
          ></Route>
          <Route exact path='/about' element={<AboutPage />} />
          <Route path='*' element={<h1>404 Not found</h1>} />
        </Routes>

        <AboutIconLink />
      </div>
    </Router>
  );
};

export default App;
