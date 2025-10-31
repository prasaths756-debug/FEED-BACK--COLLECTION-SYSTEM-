import React, { useState } from "react";
import axios from "axios";
import "./FeedbackForm.css";

function FeedbackForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    message: "",
    rating: 5,
  });

  // handle change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/feedbacks", formData);
      onAdd(res.data);
      setFormData({
        name: "",
        department: "",
        message: "",
        rating: 5,
      }); // clear form after submit
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="feedback-form">
      <h2>Add Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          name="department"
          placeholder="Your department"
          onChange={handleChange}
          value={formData.department}
          required
        />
        <textarea
          name="message"
          placeholder="Your feedback"
          onChange={handleChange}
          value={formData.message}
          required
        ></textarea>
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          onChange={handleChange}
          value={formData.rating}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
