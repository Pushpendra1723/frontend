import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await fetch(
        "https://tensorgo-frontend-2-0.onrender.com"
      );
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://tensorgo-frontend-2-0.onrender.com/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      setError("Removed Successfully");

      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //console.log(data);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-Center">Enrolled Students</h2>
      <div className="row">
        {data.map((user) => (
          <div className="col-3" key={user._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p className="card-text">{user.age}</p>
                <a
                  href="#"
                  className="card-link"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </a>
                <Link to={`/${user._id}`} className="card-link">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
