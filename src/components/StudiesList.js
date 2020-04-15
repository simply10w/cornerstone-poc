import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

import { getStudies } from "../api/studies";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export function StudiesList() {
  const classes = useStyles();

  const [studies, setStudies] = useState([]);

  useEffect(() => {
    getStudies().then((studies) => {
      setStudies(studies);
      console.log(studies);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>PatientID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Modality</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studies.map((row) => (
            <TableRow key={row.StudyInstanceUID}>
              <TableCell>
                <Link to={`/viewer/${row.StudyInstanceUID}`}>{row.Pid}</Link>
              </TableCell>
              <TableCell>{row.Name}</TableCell>
              <TableCell>{row.Modality}</TableCell>
              <TableCell>{row.Description}</TableCell>
              <TableCell>{row.Date.toLocaleString("en-US", options)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
