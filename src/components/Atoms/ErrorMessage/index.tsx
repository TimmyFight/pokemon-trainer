import { Typography } from "@mui/material";

interface Properties {
  message: string;
}

const ErrorMessage = ({ message }: Properties) => {
  return (
    <Typography color="error" variant="body2">
      {message}
    </Typography>
  );
};

export default ErrorMessage;
