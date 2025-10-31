import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackCard from "./components/FeedbackCard";
import { Plus } from "lucide-react";
import "./App.css";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/feedbacks")
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  const handleAdd = (newFeedback) => {
    setFeedbacks([newFeedback, ...feedbacks]);
    setShowForm(false);
  };

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/feedbacks/${id}`);
    setFeedbacks(feedbacks.filter((fb) => fb._id !== id));
  } catch (error) {
    console.error("Error deleting feedback:", error);
  }
};


  return (
    <div className="app-container">
      <Navbar />

      <div className="content-wrapper">
        {showForm && (
          <div className="form-overlay">
            <div className="form-popup">
              <FeedbackForm onAdd={handleAdd} />
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✖
              </button>
            </div>
          </div>
        )}

        <div className="feedback-container">
          {feedbacks.length === 0 ? (
            <p className="no-feedback-text">No feedback yet. Click + to add one!</p>
          ) : (
            feedbacks.map((fb) => (
  <FeedbackCard key={fb._id} feedback={fb} onDelete={handleDelete} />
))
          )}
        </div>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="add-btn"
        title="Add Feedback"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}

export default App;
