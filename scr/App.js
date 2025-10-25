import './App.css';
import React from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useParams, useLocation } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import models from "./modelData/models"; 


const TopBarWrapper = () => {
  const location = useLocation();
  const params = useParams();
  let user = null;
  let view = null;

  if (location.pathname.startsWith("/users/") && !location.pathname.includes("/photos")) {
    view = "details";
    user = models.userModel(params.userId);
  } else if (location.pathname.includes("/photos")) {
    view = "photos";
    user = models.userModel(params.userId);
  }

  return <TopBar user={user} view={view} />;
};

const App = (props) => {
  return (
      <Router>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
             
              <Routes>
                <Route path="/users/:userId/*" element={<TopBarWrapper />} />
                <Route path="/photos/:userId/*" element={<TopBarWrapper />} />
                <Route path="*" element={<TopBar />} />
              </Routes>
            </Grid>
            <div className="main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                  <Route path="/users" element={<UserList />} />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
  );
}

export default App;
