import React, { useState } from "react";
import {
  Button,
  Input,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

const PhotoUploadField = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setError("");
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Please select an image file.");
      }
    }
  };

  const handleUploadButtonClick = async () => {
    if (selectedFile) {
      setUploading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUploading(false);
      console.log("File uploaded:", selectedFile);
    }
  };

  return (
    <Box>
      <Input
        type="file"
        onChange={handleFileInputChange}
        inputProps={{ accept: "image/*" }}
      />
      {previewImage && (
        <Box mt={2}>
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </Box>
      )}
      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedFile || uploading}
        onClick={handleUploadButtonClick}
      >
        {uploading ? <CircularProgress size={24} /> : "Upload"}
      </Button>
    </Box>
  );
};

export default PhotoUploadField;
