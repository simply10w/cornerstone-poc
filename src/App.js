import { Button, Grid } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Layout, LayoutWrapper } from "./components/Layout";
import { ReportShort } from "./components/ReportShort/ReportShort";
import { StudiesList } from "./components/StudiesList";
import { Viewer } from "./components/Viewer";
import { ThemeProvider } from "./core/ThemeProvider";
import { useFullPageViewer } from "./hooks/useFullpageViewer";
import { useCornerstone } from "./hooks/useCornerstone";

const ViewerPanel = ({ openInFullWindow }) => (
  <>
    <Grid container spacing={0}>
      <Grid item xs={4}>
        <Button onClick={openInFullWindow}>Open in another window</Button>
      </Grid>
    </Grid>
    <Viewer />
  </>
);

const ViewerPage = () => {
  const {
    isViewerOnlyWindow,
    isViewerOpenedInAnotherWindow,
    openInFullWindow,
    viewerWindow,
  } = useFullPageViewer();
  const state = useCornerstone(viewerWindow);

  const leftPanel = () => {
    return state && <ReportShort report={state} />;
  };
  const rightPanel = () => <ViewerPanel openInFullWindow={openInFullWindow} />;

  if (isViewerOnlyWindow) {
    return (
      <LayoutWrapper>
        <Viewer />
      </LayoutWrapper>
    );
  }
  if (isViewerOpenedInAnotherWindow) {
    return <LayoutWrapper>{leftPanel()}</LayoutWrapper>;
  }
  return (
    <LayoutWrapper>
      <Layout renderLeftPanel={leftPanel} renderRightPanel={rightPanel} />
    </LayoutWrapper>
  );
};

const Routes = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Studies</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/viewer/:id">
          <ViewerPage />
        </Route>
        <Route path="/">
          <StudiesList />
        </Route>
      </Switch>
    </div>
  </Router>
);

export function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}
