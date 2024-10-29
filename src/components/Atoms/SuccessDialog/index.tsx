import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

interface Properties {
  openSuccessDialog: boolean;
  handleClose: () => void;
}

const SuccessDialog = ({ openSuccessDialog, handleClose }: Properties) => {
  return (
    <>
      <Dialog open={openSuccessDialog} onClose={handleClose}>
        <Stack
          spacing={4}
          sx={{
            alignItems: "center",
            padding: "40px 150px",
          }}>
          <Typography variant="h3">Success</Typography>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Reset form
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
};

export default SuccessDialog;
