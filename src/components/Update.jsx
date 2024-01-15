import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Getting Single User Data
  const getSingleUser = async () => {
    try {
      const response = await fetch(
        `https://tensorgo-frontend-2-0.onrender.com/${id}`
      );
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("");
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      }
    } catch (error) {
      console.error("Error fetching single user:", error);
    }
  };

  // Updating the User
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };

    try {
      const response = await fetch(
        `https://tensorgo-frontend-2-0.onrender.com/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("");
        navigate("/all");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit User Detail</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
