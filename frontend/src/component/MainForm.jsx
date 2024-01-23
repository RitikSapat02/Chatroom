import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState({ name: "", room: "" });

  const handleChange = (e) => {
    setData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validation = () => {
    if (!data.name) {
      setError("Please enter your name");
      return false;
    }
    if (!data.room) {
      setError("Please select room.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validation();
    if (isValid) {
      navigate(`/chat/${data.room}`, { state: data }); //specify route and navigate there with data provided in 2nd argument //we will use this state in our chatRoom component
    }
  };

  return (
    <div className="px-3 py-4 bg-white text-dark border">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <h2 className="text-warning mb-4">Welcome to chatClub</h2>
        </div>
        <div className="form-group mb-4">
          <input
            type="text"
            className="form-control bg-light"
            name="name"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-4">
          <select
            className="form-select bg-light"
            name="room"
            onChange={handleChange}
          >
            <option value="">Select Room</option>
            <option value="gaming">Gaming</option>
            <option value="coding">Coding</option>
            <option value="social">Social</option>
          </select>
        </div>

        <button type="submit" className="btn btn-warning w-100 mb-2">
          Submit
        </button>

        {error ? <small className="text-danger">{error}</small> : ""}
      </form>
    </div>
  );
};

export default MainForm;
