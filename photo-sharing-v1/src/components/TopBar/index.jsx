import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

function TopBar() {
  const location = useLocation();
  const { userId } = useParams();

  const [contextText, setContextText] = useState("");

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/users/") && !path.startsWith("/users/") + "undefined") {
      const user = models.userModel(userId);
      if (user) {
        setContextText(`${user.first_name} ${user.last_name}`);
      }
    } else if (path.startsWith("/photos/")) {
      const user = models.userModel(userId);
      if (user) {
        setContextText(`Photos of ${user.first_name} ${user.last_name}`);
      }
    } else {
      setContextText("");
    }
  }, [location, userId]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6" color="inherit">
          Nguyễn Trọng Khởi
        </Typography>

        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
