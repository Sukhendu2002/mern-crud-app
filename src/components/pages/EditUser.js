import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import API_URL from "../../config.js";

function EditUser() {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { id } = useParams();
  const getUser = async () => {
    const res = await axios.get(`${API_URL}/view/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container d-flex justify-content-center flex-column">
        <h1>Edit a User</h1>
        <form className="w-50 m-auto">
          <div class="form-group ">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
              value={user.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Email"
              name="email"
              value={user.email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Phone</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Phone No"
              name="phone"
              value={user.phone}
              // onChange={(e) => setPhone(e.target.value)}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            class="btn btn-warning m-2 w-30"
            onClick={async (e) => {
              e.preventDefault();
              const res = await axios.put(`${API_URL}/update/${id}`, user);
              console.log(res);
              history.push("/");
            }}
          >
            Update User
          </button>
        </form>
      </div>
    </>
  );
}

export default EditUser;
