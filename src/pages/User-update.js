import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Registered from "../assets/gux_cat.svg";
import { useHistory, Link, useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #faeee7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImgWrapper = styled.div`
  flex: 5;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 480px) {
    display: none;
  }
  @media only screen and (max-width: 860px) {
    width: 90%;
  }
`;
const Img = styled.img`
  max-width: 80%;
`;
const Formwrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex: 3;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
  @media only screen and (max-width: 860px) {
    width: 90%;
  }
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 1rem 0rem;
  padding: 0.5rem;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: #33272a;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 5px 0px 5px;
  padding: 10px;
  color: #594a4e;
  font-weight: 600;
  font-size: 15px;
`;
const Button = styled.button`
  border: none;
  margin: 3rem 2rem 0rem 2rem;
  padding: 15px 30px;
  background-color: #ff8ba7;
  cursor: pointer;
  color: #33272a;
  font-size: 17px;
  font-weight: 600;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
function UpdatePage() {
  const { user } = UserState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState({});
  const [contact, setContact] = useState("");
  const history = useHistory();
  const location = useLocation();
  const fetchUser = async () => {
    const id = location.pathname.split("/")[2];
    // console.log(id);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `https://spa-backend-app.herokuapp.com/users/${id}`,
        config
      );
      setInfo(data);
      return;
    } catch (error) {
      console.log(error.message);
      return;
    }
  };
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setName(info.name);
    setEmail(info.email);
    setContact(info.contact);
  }, [info]);

  const handleClick = async (e) => {
    e.preventDefault();
    const id = location.pathname.split("/")[2];
    if (!name || !email || !contact) {
      alert("please fill all the fields!");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(
        `https://spa-backend-app.herokuapp.com/users/${id}`,
        { name, email, contact },
        config
      );
      setName("");
      setContact("");
      setEmail("");
      history.push("/");
      return;
    } catch (error) {
      console.log(error.message);
      return;
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <ImgWrapper>
          <Img src={Registered} alt="pic.png" />
        </ImgWrapper>
        <Formwrapper>
          <div>
            <Title>UPDATE AN ACCOUNT</Title>
            <Form>
              <Input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="name"
                value={name}
              />
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="email"
                value={email}
                placeholder="e-mail"
              />
              <Input
                type="password"
                name="password"
                disabled
                placeholder="password"
              />
              <Input
                onChange={(e) => setContact(e.target.value)}
                type="number"
                name="contact"
                value={contact}
                placeholder="mobile-no"
              />
              <ButtonWrapper>
                <Button onClick={handleClick}>Update</Button>
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </ButtonWrapper>
            </Form>
          </div>
        </Formwrapper>
      </Container>
    </>
  );
}

export default UpdatePage;
