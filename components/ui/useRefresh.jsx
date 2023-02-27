import { useState } from "react";

function useRefresh() {

  const [change, setChange] = useState(false)

  function refresh() {
    setChange(!change)
  }

  return ({ change, refresh });
}

export default useRefresh;