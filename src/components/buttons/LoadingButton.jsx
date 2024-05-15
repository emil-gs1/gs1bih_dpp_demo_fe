import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({ title, isLoading, onClick }) => {
  return (
    <Button variant="contained" onClick={onClick} disabled={isLoading}>
      {isLoading ? <CircularProgress size={24} /> : title}
    </Button>
  );
};

export default LoadingButton;
