import './App.css';

import React from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = () => {
  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          {/* TopBar */}
          <Grid item xs={12}>
            <TopBar />
          </Grid>

          {/* Spacer to push content under TopBar */}
          <div className="main-topbar-buffer" />

          {/* Sidebar - User List */}
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>

          {/* Main Content - Routes */}
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                <Route path="/photos/:userId/:photoIndex" element={<UserPhotos />} />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
