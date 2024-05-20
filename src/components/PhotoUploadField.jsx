import React, { useState, useEffect } from "react";
import { Input, Box, CircularProgress, Typography } from "@mui/material";

const PhotoUploadField = ({
  base64,
  setBase64,
  values,
  setFormValues,
  fieldName,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Photo base 64 is ", base64);
  }, [base64]);

  useEffect(() => {
    console.log("values", values);
  }, [values]);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setError("");

    if (file) {
      if (file.type.startsWith("image/")) {
        try {
          const base64String = await convertToBase64(file);
          setBase64(base64String);

          setFormValues(() => ({
            ...values,
            [fieldName]: base64String,
          }));

          const reader = new FileReader();
          reader.onload = () => {
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error("Error converting to base64:", error);
          setError("Error converting image. Please try again.");
        }
      } else {
        setError("Please select an image file.");
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <Box>
      <Input
        type="file"
        onChange={handleFileInputChange}
        inputProps={{ accept: "image/*" }}
      />
      {base64 && (
        <Box mt={2}>
          <img
            src={`data:image/jpeg;base64,${base64}`}
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
      {uploading && <CircularProgress size={24} />}
    </Box>
  );
};

export default PhotoUploadField;
