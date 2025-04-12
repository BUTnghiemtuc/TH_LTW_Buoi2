import React from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography variant="body1">User not found!</Typography>;
  }

  return (
    <Card className="user-detail-card">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body1">
          <strong>Occupation:</strong> {user.occupation}
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> {user.location}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {user.description}
        </Typography>

        <Button
          variant="outlined"
          component={Link}
          to={`/photos/${user._id}`}
          sx={{ mt: 2 }}
        >
          Xem ảnh của {user.first_name}
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
