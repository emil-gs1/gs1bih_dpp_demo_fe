import {
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { loginModalStyles } from "./loginModal.styles";

const LoginModal = ({
  open,
  handleClose,
  handleLogin,
  email,
  password,
  rememberMe,
  setEmail,
  setPassword,
  setRememberMe,
}) => {
  const theme = useTheme();
  return (
    <Modal open={open} onClose={handleClose} disableScrollLock>
      <Box sx={loginModalStyles.container}>
        <TextField
          label="Email"
          fullWidth
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: 12,
                color: theme.palette.primary.main,
                fontFamily: "Gotham",
              }}
            >
              Zapamti me
            </Typography>
          }
        />
        <Box sx={loginModalStyles.loginButton}>
          <Button onClick={handleLogin} variant="contained">
            Login
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;
