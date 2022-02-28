import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import axios from "axios";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components";
import { InfoButton } from "./ViewModal";
import { useHistory, Link } from "react-router-dom";
import { UserState } from "../context/UserProvider";
const Button = styled.button`
  padding: 5px 10px;
  margin: 3px 10px 0px 0px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
`;

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 130 },
  {
    id: "email",
    label: "E-mail",
    minWidth: 130,
  },
  {
    id: "contact",
    label: "Contact",
    minWidth: 130,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
  },
];
// for the pagination Part !

const useStyles = makeStyles({
  root: {
    width: "97%",
    maxHeight: "100vh",
    margin: "1rem",
    backgroundColor: "#faeee7",
  },
  head: {},
  container: {
    maxHeight: 440,
  },
});
export default function SPATable({ data }) {
  const classes = useStyles();
  const history = useHistory();
  const { user } = UserState();
  const handleDelete = async (e) => {
    console.log(e.target.value);
    e.preventDefault();
    try {
      console.log(
        `https://spa-backend-app.herokuapp.com/users/${e.target.value}`
      );
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const data = await axios.delete(
        `https://spa-backend-app.herokuapp.com/users/${e.target.value}`,
        config
      );
      console.log(data);
      if (data) alert("The user is deleted !");
      history.go(0);
    } catch (error) {
      if (error) console.log(error.message);
      return;
    }
  };
  return (
    <Paper className={classes.root}>
      <TableContainer
        className={classes.container}
        style={{ maxHeight: "100vh" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    backgroundColor: "#f3d3c0",
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align={"left"}>{row.name}</TableCell>
                  <TableCell align={"left"}>{row.email}</TableCell>
                  <TableCell align={"left"}>{row.contact}</TableCell>
                  <TableCell align={"left"}>
                    <ButtonWrapper>
                      <Button
                        style={{
                          backgroundColor: "#c3f0ca",
                          color: "black",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        <InfoButton info={row} />
                      </Button>
                      <Link to={`/update/${row._id}`}>
                        <Button
                          style={{
                            backgroundColor: "#ff8906",
                            color: "black",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        style={{
                          backgroundColor: "#e53170",
                          color: "black",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                        value={row._id}
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </ButtonWrapper>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
