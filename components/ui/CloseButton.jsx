
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function CloseButton({onClick}) {
  return (
    <>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <IconButton onClick={() => onClick()}>
          <CloseIcon style={{ fill: "white" }} sx={{ fontSize: "30px" }} />
        </IconButton>
      </div>
    </>
  );
}

export default CloseButton;