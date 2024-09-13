import React, { useState } from 'react';
import { db, auth } from './firebase'; // Import Firebase
import { addDoc, collection } from 'firebase/firestore';
import './FeedbackForm.css'; // Import your CSS

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName || '',
    email: auth.currentUser?.email || '',
    feedback: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.feedback) {
      setError('Please provide your feedback.');
      return;
    }

    try {
      // Submit feedback to Firestore
      await addDoc(collection(db, 'feedback'), {
        name: formData.name,
        email: formData.email,
        feedback: formData.feedback,
        userId: auth.currentUser?.uid,
        timestamp: new Date(),
      });
      setFormSubmitted(true);
      setFormData({ ...formData, feedback: '' });
    } catch (error) {
      setError('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      {formSubmitted ? (
        <p className="success-message">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="feedback">Your Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              rows="4"
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
