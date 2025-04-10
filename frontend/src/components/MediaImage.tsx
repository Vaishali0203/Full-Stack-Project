import React from "react";
import { useParams } from "react-router-dom";

const MediaImage = () => {
  const { imageName } = useParams();

  // Assuming images are in 'public/static/media'
  const imageUrl = `/static/media/${imageName}`;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Image Preview</h2>
      <img
        src={imageUrl}
        alt={imageName}
        style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc" }}
        onError={() => alert("Image not found")}
      />
    </div>
  );
};

export default MediaImage;
