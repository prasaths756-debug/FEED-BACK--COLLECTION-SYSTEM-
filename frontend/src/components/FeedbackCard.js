import React from "react";
import "./FeedbackCard.css";

function FeedbackCard({ feedback, onDelete }) {
  return (
    <div className="feedback-card">
      <h3>{feedback.name}</h3>
      <p>{feedback.department}</p>
      <p>{feedback.message}</p>
      <p>⭐ {feedback.rating}/5</p>
      <button
        onClick={() => onDelete(feedback._id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
}

export default FeedbackCard;
 