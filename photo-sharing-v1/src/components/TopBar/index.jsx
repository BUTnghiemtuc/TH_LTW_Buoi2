import React, { useEffect, useState, useContext } from "react";
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";
import { AdvancedFeatureContext } from "../../contexts/AdvancedFeatureContext";
import "./styles.css";

function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  const { advancedEnabled, setAdvancedEnabled } = useContext(AdvancedFeatureContext);

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    if (location.pathname.startsWith("/users/") && pathParts.length >= 3) {
      const user = models.userModel(pathParts[2]);
      if (user) setContextText(`${user.first_name} ${user.last_name}`);
    } else if (location.pathname.startsWith("/photos/") && pathParts.length >= 3) {
      const user = models.userModel(pathParts[2]);
      if (user) setContextText(`Photos of ${user.first_name} ${user.last_name}`);
    } else {
      setContextText("");
    }
  }, [location]);

  return (
    <AppBar position="absolute">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Nguyễn Trọng Khởi</Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Typography variant="h6">{contextText}</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={advancedEnabled}
                onChange={(e) => setAdvancedEnabled(e.target.checked)}
                color="default"
              />
            }
            label="Enable Advanced Features"
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
