import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    title: {
      color: "#fff",
    },
    data: {
      color: "#fff",
    },
  })
);

export function Layout({ renderLeftPanel, renderRightPanel }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={0}>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            {renderLeftPanel()}
          </Grid>
          <Grid item xs={8}>
            {renderRightPanel()}
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
