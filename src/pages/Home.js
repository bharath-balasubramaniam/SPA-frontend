import React, { useEffect } from "react";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import SPATable from "../components/SPATable";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #faeee7;
`;
function HomePage() {
  const { user } = UserState();
  const [users, setUsers] = React.useState([]);
  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://spa-backend-app.herokuapp.com/users",
        config
      );
      setUsers(data);
    } catch (error) {
      alert("failed to load the users!");
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Navbar />
      <SPATable data={users} />
    </Container>
  );
}

export default HomePage;
