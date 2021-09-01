import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_URL from "../../config.js";

function ViewUser() {
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

  return (
    <>
      <div className="container">
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.phone}</h1>
      </div>
    </>
  );
}

export default ViewUser;
