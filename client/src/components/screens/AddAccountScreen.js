import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";

const AddAccountScreen = (prop) => {
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  })
  //const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

async function submit(e) {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("authToken"),
      },
    };

    try {
      const { data } = await axios.post("/homeAdmin/register",{...userdata},config);

      //localStorage.setItem("authToken", data.token);

      console.log(data);
    } catch (error) {
      console.log("khong nhap duoc");
      setError("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  function handle(e){
    const newData = {...userdata}
    newData[e.target.id]=e.target.value
    setUserdata(newData)
  }

  return (
    <div className="register-screen">
      <form onSubmit={(e)=>submit(e)} className="register-screen__form">
        <h3 className="register-screen__title">Add Account</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            required
            id="name"
            placeholder="Enter Name"
            value={userdata.name}
            onChange={(e)=>handle(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            required
            id="email"
            placeholder="Email address"
            value={userdata.email}
            onChange={(e)=>handle(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Phone:</label>
          <input
            type="text"
            name="phone"
            required
            id="phone"
            placeholder="Phone"
            value={userdata.phone}
            onChange={(e)=>handle(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={userdata.password}
            onChange={(e)=>handle(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Role:</label>
          <input
            type="text"
            name="role"
            required
            id="role"
            placeholder="Enter Role"
            value={userdata.role}
            onChange={(e)=>handle(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Account
        </button>
      </form>
    </div>
  );
};


export default AddAccountScreen;