import { showNotification, updateNotification } from '@mantine/notifications';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';

function loadingAlert(id, message, title) {
  return {
    id: id,
    loading: true,
    disallowClose: true,
    autoClose: false,
    title: title || "Loading...",
    message: message,
    color: "#FF9244",
    styles: (theme) => ({
      root: {
        backgroundColor: "rgb(250, 250, 250)",
        border: "none",
      },
      title: { color: "#FF9244"},
      description: { color: "#FF9244" },
    }),
  }
}

function successAlert(id, message, title) {
  return {
    id: id, 
    title: title || 'Success',
    message: message,
    color: "green",
    icon: <CheckCircleOutlineIcon />,
    styles: (theme) => ({
      root: {
        backgroundColor: "#4BB543",
        border: "none",
      },
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: "#47ab3f" },
      },
    }),
  }
}

function errorAlert(id, message, title) {
  return {
    id: id,
    title: title || 'Error',
    message: message,
    color: "red",
    icon: <ErrorIcon />,
    styles: (theme) => ({
      root: {
        backgroundColor: "#ff3333",
        border: "none",
      },
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: "#fb0000" },
      },
    }),
  }
}

function showLoading(id, message, title) {
  showNotification(loadingAlert(id, message, title))
}

function showSuccess(id, message, title) {
  showNotification(successAlert(id, message, title))
}

function showError(id, message, title) {
  showNotification(errorAlert(id, message, title))
}

function updateSuccess(id, message, title) {
  updateNotification(successAlert(id, message, title))
}

function updateError(id, message, title) {
  updateNotification(errorAlert(id, message, title))
}

export { showLoading, showSuccess, showError, updateSuccess, updateError } 