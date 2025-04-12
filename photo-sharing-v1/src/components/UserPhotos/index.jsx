import React, { useContext } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link as MuiLink,
  Button,
  Box,
} from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import models from "../../modelData/models";
import { AdvancedFeatureContext } from "../../contexts/AdvancedFeatureContext";
import "./styles.css";

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleString("vi-VN");
}

function UserPhotos() {
  const { userId, photoIndex } = useParams();
  const navigate = useNavigate();
  const { advancedEnabled } = useContext(AdvancedFeatureContext);

  const photos = models.photoOfUserModel(userId);
  const index = parseInt(photoIndex || 0); // nếu không có photoIndex thì là 0

  // Nếu không có ảnh
  if (!photos || photos.length === 0) {
    return <Typography variant="body1" sx={{ m: 2 }}>Không có ảnh nào.</Typography>;
  }

  // 🟡 Nếu advanced feature bật: chỉ hiển thị 1 ảnh
  if (advancedEnabled) {
    const photo = photos[index];

    if (!photo) {
      return <Typography variant="body1">Không tìm thấy ảnh.</Typography>;
    }

    return (
      <Box className="photo-list" sx={{ textAlign: "center" }}>
        <Card className="photo-card">
          <CardMedia
            component="img"
            image={require(`../../images/${photo.file_name}`)}
            alt={`Ảnh của user ${photo.user_id}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Đăng lúc: {formatDateTime(photo.date_time)}
            </Typography>

            {photo.comments?.length > 0 && (
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

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(`/photos/${userId}/${index - 1}`)}
            disabled={index === 0}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/photos/${userId}/${index + 1}`)}
            disabled={index === photos.length - 1}
          >
            Next
          </Button>
        </Box>
      </Box>
    );
  }

  // 🔵 Nếu advanced feature tắt: hiển thị toàn bộ ảnh
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

            {photo.comments?.length > 0 && (
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
