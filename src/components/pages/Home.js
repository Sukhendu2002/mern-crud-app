import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../config.js";

function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`${API_URL}/user`);
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    console.log(id);
    await axios
      .delete(`${API_URL}/delete/${id}`)
      .then((res) => {
        loadUsers();
        console.log(res);
      })
      .catch((err) => console.log(err));

    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1 className="m-3">All User</h1>
        <table class="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone No</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Link
                    className="btn btn-primary m-2"
                    exact
                    to={`/viewuser/${user._id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-warning m-2"
                    exact
                    to={`/update/${user._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
