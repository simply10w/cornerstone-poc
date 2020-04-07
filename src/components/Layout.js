import React from "react";
import { Paper, Grid, Box, makeStyles, createStyles } from "@material-ui/core";

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
    leftPanel: {
      maxHeight: "100vh",
      overflow: "scroll",
    },
  })
);

function LeftPanelScrollable() {}

export function Layout({ renderLeftPanel, renderRightPanel }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={0}>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Box pr={2}>
              <div className={classes.leftPanel}>{renderLeftPanel()}</div>
            </Box>
          </Grid>
          <Grid item xs={8}>
            {renderRightPanel()}
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
