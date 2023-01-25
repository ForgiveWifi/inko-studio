
export default function errorMessage(error, msg) {
  return ({
    error: error,
    description: msg
  });
}

