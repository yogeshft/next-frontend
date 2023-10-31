"use client";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

import { API } from "./config";

const page = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API.localhost + "/get");
      console.log(response.data);
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(API.localhost + "/delete/" + id);
    console.log("deleted");
    console.log(users, "befire");
    fetchUsers();
    console.log(users, "after");

    // window.location.reload();
  };

  return (
    <Container>
      <h1>Users</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>User Type</th>
            <th>Address</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.userType}</td>
              <td>{user.address}</td>
              <td>
                <Link href={`/editUser?id=${user._id}`}>Edit</Link>
              </td>
              <td onClick={() => handleDelete(user._id)}>Delete</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link href={"/addUser"}>
        <Button variant="primary">Add</Button>
      </Link>
    </Container>
  );
};

export default page;
