import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleString("vi-VN"); // 
}

function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="body1" sx={{ m: 2 }}>
        Không có ảnh nào cho người dùng này.
      </Typography>
    );
  }

  return (
    <div className="photo-list">
      {photos.map((photo) => (
        <Card key={photo._id} className="photo-card">
          <CardMedia
            component="img"
            image={require(`../../images/${photo.file_name}`)}
            alt={`Ảnh của user ${photo.user_id}`}
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Đăng lúc: {formatDateTime(photo.date_time)}
            </Typography>

            {/* Hiển thị các comment */}
            {photo.comments && photo.comments.length > 0 && (
              <>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1">Bình luận:</Typography>
                {photo.comments.map((cmt) => (
                  <div key={cmt._id} className="comment">
                    <Typography variant="body2">
                      <MuiLink component={Link} to={`/users/${cmt.user._id}`}>
                        {cmt.user.first_name} {cmt.user.last_name}
                      </MuiLink>{" "}
                      ({formatDateTime(cmt.date_time)}):
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      {cmt.comment}
                    </Typography>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
