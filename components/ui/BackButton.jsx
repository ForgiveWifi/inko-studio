import Router from 'next/router'
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { cleanNotifications } from "@mantine/notifications";

export default function BackButton() {

  function goBack() {
    cleanNotifications()
    Router.back()
  }
  
  return(
    <>
      <div style={{ position: "absolute", top: 20, left: 20}}>
        <IconButton onClick={goBack}>
          <ArrowBackIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </div>
    </>
  )
}