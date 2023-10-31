"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

import { API } from "../config";

const page = () => {
  const [data, setData] = useState([]);

  const [state, setState] = useState({
    name: "",
    dob: "",
    gender: "",
    userType: "",
    address: "",
  });

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    if (id) {
      const res = await axios.get(API.localhost + "/getOne/" + id);
      setData(res.data);
      setState({
        name: res.data.name,
        dob: res.data.dob,
        gender: res.data.gender,
        userType: res.data.userType,
        address: res.data.address,
      });
    } else return;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(API.localhost + "/edit/" + id, state);
    if (res.data !== null) {
      console.log("submiited");
      window.location.href = "/";
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          name="name"
          type="text"
          defaultValue={state.name}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      <Form.Group controlId="dob">
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control
          name="dob"
          type="date"
          defaultValue={state.dob}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      <Form.Group controlId="gender">
        <Form.Label>Gender:</Form.Label>
        <Form.Control
          as="select"
          name="gender"
          type="text"
          value={state.gender}
          onChange={(e) => handleChange(e)}
        >
          <option hidden>select gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="userType">
        <Form.Label>User Type:</Form.Label>
        <Form.Control
          as="select"
          name="userType"
          value={state.userType}
          onChange={(e) => handleChange(e)}
        >
          <option value="">Select User Type</option>
          <option value="superuser">Super User</option>
          <option value="admin">Admin User</option>
          <option value="normal">Normal User</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="address">
        <Form.Label>Address:</Form.Label>
        <Form.Control
          name="address"
          type="text"
          defaultValue={state.address}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default page;
